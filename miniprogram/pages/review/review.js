const { loadState, updateRecord } = require('../../utils/store')

function money(value) {
  const amount = Number(value || 0)
  return amount.toFixed(Number.isInteger(amount) ? 0 : 1)
}

Page({
  data: {
    id: '',
    record: null,
    decision: '',
    reviewText: ''
  },

  onLoad(query) {
    this.setData({ id: query.id || '' })
    this.refresh()
  },

  refresh() {
    const record = (loadState().records || []).find(item => item.id === this.data.id)
    if (!record) {
      wx.showToast({ title: '订单不存在', icon: 'none' })
      setTimeout(() => wx.navigateBack(), 500)
      return
    }
    const items = (record.items || []).map(item => Object.assign({}, item, {
      lineTotalText: money(Number(item.price || 0) * Number(item.qty || 0))
    }))
    this.setData({
      record: Object.assign({}, record, {
        iconPath: record.iconPath || '/runtime-assets/icons/3d-present.png',
        orderNo: record.orderNo || String(record.id || '').slice(-8),
        amountText: money(record.amount),
        items
      }),
      decision: record.decision || '',
      reviewText: record.reviewText || ''
    })
  },

  selectDecision(e) {
    this.setData({ decision: e.currentTarget.dataset.decision })
  },

  onTextInput(e) {
    this.setData({ reviewText: e.detail.value })
  },

  submitReview() {
    if (!this.data.decision) {
      wx.showToast({ title: '先选择这单的结果', icon: 'none' })
      return
    }
    updateRecord(this.data.id, {
      decision: this.data.decision,
      reviewText: this.data.reviewText.trim(),
      routeStage: 5,
      reviewedAt: Date.now()
    })
    const kept = this.data.decision === 'kept'
    wx.showToast({ title: kept ? '已计入省钱账单' : '已记录这次购买', icon: 'success' })
    setTimeout(() => {
      wx.switchTab({ url: kept ? '/pages/saved/saved' : '/pages/records/records' })
    }, 450)
  },

  extendCooling() {
    updateRecord(this.data.id, {
      decision: '',
      reviewAt: Date.now() + 3 * 24 * 60 * 60 * 1000,
      routeStage: 1,
      autoRoute: true
    })
    wx.showToast({ title: '再冷静 3 天', icon: 'none' })
    setTimeout(() => wx.switchTab({ url: '/pages/records/records' }), 450)
  }
})
