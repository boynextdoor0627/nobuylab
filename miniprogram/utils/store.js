const { plazaPosts } = require('./data')

const KEY = 'nobuylab-mp-mvp-v1'

function uid(prefix) {
  return prefix + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7)
}

function dateKey(date) {
  const d = date || new Date()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return d.getFullYear() + '-' + month + '-' + day
}

function defaultState() {
  return {
    records: [],
    cart: [],
    drafts: [],
    likes: [],
    favorites: [],
    comments: {},
    confirmedSaved: 0,
    createdAt: Date.now()
  }
}

function loadState() {
  try {
    const raw = wx.getStorageSync(KEY)
    if (raw) return Object.assign(defaultState(), raw)
  } catch (e) {}
  return defaultState()
}

function saveState(state) {
  wx.setStorageSync(KEY, state)
  return state
}

function cartItems() {
  return loadState().cart || []
}

function addCartItem(product) {
  const state = loadState()
  const cart = state.cart || []
  const current = cart.find(item => item.id === product.id)
  if (current) {
    current.qty = Number(current.qty || 0) + 1
  } else {
    cart.push(Object.assign({}, product, { qty: 1 }))
  }
  state.cart = cart
  return saveState(state)
}

function changeCartItem(id, delta) {
  const state = loadState()
  state.cart = (state.cart || [])
    .map(item => item.id === id
      ? Object.assign({}, item, { qty: Number(item.qty || 0) + Number(delta || 0) })
      : item)
    .filter(item => item.qty > 0)
  return saveState(state)
}

function clearCart() {
  const state = loadState()
  state.cart = []
  return saveState(state)
}

function createCoolingOrder(items) {
  const state = loadState()
  const normalized = (items || []).filter(item => Number(item.qty || 0) > 0)
  if (!normalized.length) return null
  const now = Date.now()
  const itemCount = normalized.reduce((sum, item) => sum + Number(item.qty || 0), 0)
  const amount = normalized.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0)
  const coolingMinutes = Math.max.apply(null, normalized.map(item => Number(item.coolingMinutes || 1440)))
  const first = normalized[0]
  const record = {
    id: uid('order'),
    orderNo: String(now).slice(-8),
    type: first.categoryLabel || '其他',
    icon: first.icon || '🛍️',
    iconPath: first.iconPath || '/runtime-assets/icons/3d-present.png',
    name: first.name + (itemCount > 1 ? '等 ' + itemCount + ' 件' : ''),
    items: normalized.map(item => Object.assign({}, item)),
    itemCount,
    amount,
    note: '这是一张模拟订单，不会向任何商家下单或付款。',
    createdAt: now,
    reviewAt: now + coolingMinutes * 60 * 1000,
    coolingMinutes,
    decision: '',
    reviewText: '',
    routeStage: 1,
    autoRoute: true,
    mapNote: '路线为本地模拟，不读取、不上传定位。'
  }
  state.records = [record].concat(state.records || [])
  state.cart = []
  saveState(state)
  return record
}

function createPauseRecord(option, payload) {
  const state = loadState()
  const amount = Number(payload.amount || 0)
  const now = Date.now()
  const record = {
    id: uid('pause'),
    type: option.label,
    icon: option.icon,
    name: payload.name || option.defaultName,
    amount,
    note: option.copy,
    createdAt: now,
    reviewAt: now + 24 * 60 * 60 * 1000,
    decision: '',
    reviewText: '',
    routeStage: 0,
    mapNote: '路线为本地模拟，不读取、不上传定位。'
  }
  state.records = [record].concat(state.records || [])
  return saveState(state)
}

function updateRecord(id, patch) {
  const state = loadState()
  const previous = (state.records || []).find(item => item.id === id)
  state.records = (state.records || []).map(item => item.id === id ? Object.assign({}, item, patch) : item)
  if (patch.decision === 'kept') {
    const record = state.records.find(item => item.id === id)
    if (record && !record.savedCounted) {
      record.savedCounted = true
      state.confirmedSaved = Number(state.confirmedSaved || 0) + Number(record.amount || 0)
    }
  }
  if (patch.decision && patch.decision !== 'kept' && previous && previous.savedCounted) {
    const record = state.records.find(item => item.id === id)
    if (record) record.savedCounted = false
    state.confirmedSaved = Math.max(0, Number(state.confirmedSaved || 0) - Number(previous.amount || 0))
  }
  return saveState(state)
}

function routeMeta(record) {
  const fromMap = {
    '吃喝': '下单冲动点',
    '数码': '新品测评区',
    '穿搭': '种草橱窗',
    '护肤': '囤货货架',
    '家居': '软装展厅'
  }
  const remaining = Math.max(0, Number(record.reviewAt || 0) - Date.now())
  let etaText = Math.max(0, (5 - Number(record.routeStage || 0)) * 2) + ' 分钟'
  if (record.autoRoute) {
    const minutes = Math.ceil(remaining / 60000)
    if (minutes < 60) etaText = Math.max(1, minutes) + ' 分钟'
    else if (minutes < 48 * 60) etaText = Math.ceil(minutes / 60) + ' 小时'
    else etaText = Math.ceil(minutes / 1440) + ' 天'
  }
  return {
    from: fromMap[record.type] || '冲动现场',
    to: '冷静箱',
    distance: (1.8 + (String(record.id).charCodeAt(6) % 7) / 10).toFixed(1),
    eta: Math.max(0, (5 - Number(record.routeStage || 0)) * 2),
    etaText
  }
}

function allPosts() {
  const state = loadState()
  const drafts = (state.drafts || []).map(item => Object.assign({
    local: true,
    author: '我',
    likes: 0,
    comments: []
  }, item))
  return drafts.concat(plazaPosts)
}

function findPost(id) {
  return allPosts().find(item => item.id === id)
}

function postComments(id) {
  const state = loadState()
  const post = findPost(id)
  return (post ? (post.comments || []) : []).concat((state.comments || {})[id] || [])
}

function commentCount(id) {
  return postComments(id).length
}

function toggleLike(id) {
  const state = loadState()
  const set = new Set(state.likes || [])
  if (set.has(id)) set.delete(id)
  else set.add(id)
  state.likes = Array.from(set)
  return saveState(state)
}

function toggleFavorite(id) {
  const state = loadState()
  const set = new Set(state.favorites || [])
  if (set.has(id)) set.delete(id)
  else set.add(id)
  state.favorites = Array.from(set)
  return saveState(state)
}

function addComment(id, text) {
  const state = loadState()
  state.comments = state.comments || {}
  state.comments[id] = [{ name: '我', text, createdAt: Date.now() }].concat(state.comments[id] || [])
  return saveState(state)
}

function addDraft(payload) {
  const state = loadState()
  const draft = {
    id: uid('draft'),
    topic: payload.topic || '差点买了',
    icon: payload.icon || '🛍️',
    iconPath: payload.iconPath || '/runtime-assets/icons/3d-photo.png',
    tone: 'green',
    photo: payload.photo || '',
    title: payload.title || payload.summary.slice(0, 24),
    summary: payload.summary,
    body: [payload.summary],
    tags: payload.tags || ['本地动态'],
    createdAt: Date.now()
  }
  state.drafts = [draft].concat(state.drafts || [])
  return saveState(state)
}

function stats() {
  const state = loadState()
  const records = state.records || []
  const reviewed = records.filter(item => item.decision)
  const kept = reviewed.filter(item => item.decision === 'kept')
  return {
    total: records.length,
    cooling: records.filter(item => !item.decision).length,
    reviewed: reviewed.length,
    kept: kept.length,
    bought: reviewed.filter(item => item.decision === 'bought').length,
    savedOrderCount: kept.length,
    confirmedSaved: Number(state.confirmedSaved || 0)
  }
}

module.exports = {
  KEY,
  uid,
  dateKey,
  loadState,
  saveState,
  cartItems,
  addCartItem,
  changeCartItem,
  clearCart,
  createCoolingOrder,
  createPauseRecord,
  updateRecord,
  routeMeta,
  allPosts,
  findPost,
  postComments,
  commentCount,
  toggleLike,
  toggleFavorite,
  addComment,
  addDraft,
  stats
}
