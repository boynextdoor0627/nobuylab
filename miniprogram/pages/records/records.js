const { loadState, routeMeta, stats } = require('../../utils/store')

function money(value) {
  const amount = Number(value || 0)
  return amount.toFixed(Number.isInteger(amount) ? 0 : 1)
}

function dateText(ts) {
  const date = new Date(ts)
  return (date.getMonth() + 1) + '月' + date.getDate() + '日 ' +
    String(date.getHours()).padStart(2, '0') + ':' +
    String(date.getMinutes()).padStart(2, '0')
}

function automaticStage(item) {
  if (!item.autoRoute) return Math.max(0, Math.min(5, Number(item.routeStage || 0)))
  const start = Number(item.createdAt || Date.now())
  const end = Math.max(start + 1, Number(item.reviewAt || start + 1))
  const progress = Math.max(0, Math.min(1, (Date.now() - start) / (end - start)))
  return Math.max(1, Math.min(5, Math.floor(progress * 5) + 1))
}

function stageMeta(stage) {
  const list = [
    { label: '正在研究中', className: 'cooling' },
    { label: '正在研究中', className: 'cooling' },
    { label: '冷静等待中', className: 'cooling' },
    { label: '正在送往冷静箱', className: 'cooling' },
    { label: '即将送达', className: 'ready' },
    { label: '等你确认', className: 'ready' }
  ]
  return list[stage] || list[0]
}

function mapRecord(item) {
  const routeStage = automaticStage(item)
  const stage = stageMeta(routeStage)
  let statusLabel = stage.label
  let statusClass = stage.className
  if (item.decision === 'kept') {
    statusLabel = '已省钱'
    statusClass = 'kept'
  }
  if (item.decision === 'bought') {
    statusLabel = '已记录'
    statusClass = 'bought'
  }
  const items = (item.items || []).map(product => Object.assign({}, product, {
    lineTotalText: money(Number(product.price || 0) * Number(product.qty || 0))
  }))
  const route = routeMeta(Object.assign({}, item, { routeStage }))
  return Object.assign({}, item, {
    orderNo: item.orderNo || String(item.id || '').slice(-8),
    iconPath: item.iconPath || '/runtime-assets/icons/3d-present.png',
    amountText: money(item.amount),
    dateText: dateText(item.createdAt),
    routeStage,
    route,
    statusLabel,
    statusClass,
    items,
    itemCount: Number(item.itemCount || items.reduce((sum, product) => sum + Number(product.qty || 0), 0) || 1),
    actionLabel: item.decision ? '查看结果' : (routeStage >= 5 ? '确认这单' : '现在决定')
  })
}

Page({
  data: {
    filter: 'all',
    records: [],
    stats: {}
  },

  onShow() {
    this.refresh()
    this.refreshTimer = setInterval(() => this.refresh(), 30000)
  },

  onHide() {
    clearInterval(this.refreshTimer)
  },

  onUnload() {
    clearInterval(this.refreshTimer)
  },

  setFilter(e) {
    this.setData({ filter: e.currentTarget.dataset.filter })
    this.refresh()
  },

  refresh() {
    const state = loadState()
    let records = (state.records || []).map(mapRecord)
    if (this.data.filter === 'active') records = records.filter(item => !item.decision)
    if (this.data.filter === 'reviewed') records = records.filter(item => item.decision)
    this.setData({ records, stats: stats() })
  },

  openReview(e) {
    wx.navigateTo({ url: '/pages/review/review?id=' + e.currentTarget.dataset.id })
  },

  goShop() {
    wx.switchTab({ url: '/pages/today/today' })
  }
})
