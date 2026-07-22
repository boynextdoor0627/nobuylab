const { loadState, updateRecord, routeMeta, stats } = require('../../utils/store')

function money(value) {
  const n = Number(value || 0)
  return n.toFixed(Number.isInteger(n) ? 0 : 1)
}

function dateText(ts) {
  const d = new Date(ts)
  return (d.getMonth() + 1) + '月' + d.getDate() + '日 ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0')
}

function mapRecord(item) {
  const routeStage = Math.max(0, Math.min(5, Number(item.routeStage || 0)))
  let statusLabel = routeStage >= 5 ? '可开奖' : '待开奖'
  let statusClass = routeStage >= 5 ? 'ready' : 'cooling'
  if (item.decision === 'kept') {
    statusLabel = '已省下'
    statusClass = 'kept'
  }
  if (item.decision === 'bought') {
    statusLabel = '已记录'
    statusClass = 'bought'
  }
  return Object.assign({}, item, {
    amountText: money(item.amount),
    dateText: dateText(item.createdAt),
    routeStage,
    route: routeMeta(Object.assign({}, item, { routeStage })),
    statusLabel,
    statusClass
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
  },

  setFilter(e) {
    this.setData({ filter: e.currentTarget.dataset.filter })
    this.refresh()
  },

  refresh() {
    const state = loadState()
    let records = (state.records || []).map(mapRecord)
    if (this.data.filter === 'cooling') records = records.filter(item => !item.decision)
    if (this.data.filter === 'reviewed') records = records.filter(item => item.decision)
    this.setData({ records, stats: stats() })
  },

  advanceRoute(e) {
    const id = e.currentTarget.dataset.id
    const record = (loadState().records || []).find(item => item.id === id)
    if (!record) return
    const nextStage = Math.min(5, Number(record.routeStage || 0) + 1)
    updateRecord(id, { routeStage: nextStage })
    this.refresh()
    wx.showToast({ title: nextStage >= 5 ? '可以开奖了' : '路线已推进', icon: 'none' })
  },

  openReview(e) {
    wx.navigateTo({ url: '/pages/review/review?id=' + e.currentTarget.dataset.id })
  },

  goToday() {
    wx.switchTab({ url: '/pages/today/today' })
  }
})
