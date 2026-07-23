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
  state.records = (state.records || []).map(item => item.id === id ? Object.assign({}, item, patch) : item)
  if (patch.decision === 'kept') {
    const record = state.records.find(item => item.id === id)
    if (record && !record.savedCounted) {
      record.savedCounted = true
      state.confirmedSaved = Number(state.confirmedSaved || 0) + Number(record.amount || 0)
    }
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
  return {
    from: fromMap[record.type] || '冲动现场',
    to: '冷静箱',
    distance: (1.8 + (String(record.id).charCodeAt(6) % 7) / 10).toFixed(1),
    eta: Math.max(0, (5 - Number(record.routeStage || 0)) * 2)
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
    confirmedSaved: Number(state.confirmedSaved || 0)
  }
}

module.exports = {
  KEY,
  uid,
  dateKey,
  loadState,
  saveState,
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
