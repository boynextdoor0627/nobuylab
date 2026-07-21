const { loadState, updateRecord } = require('../../utils/store')

function money(value) {
  const n = Number(value || 0)
  return n.toFixed(Number.isInteger(n) ? 0 : 1)
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
      wx.showToast({ title: '记录不存在', icon: 'none' })
      setTimeout(() => wx.navigateBack(), 500)
      return
    }
    this.setData({
      record: Object.assign({}, record, { amountText: money(record.amount) }),
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
      wx.showToast({ title: '先选择一个结果', icon: 'none' })
      return
    }
    updateRecord(this.data.id, {
      decision: this.data.decision,
      reviewText: this.data.reviewText.trim(),
      routeStage: 5,
      reviewedAt: Date.now()
    })
    wx.showToast({ title: '复盘已保存', icon: 'success' })
    setTimeout(() => wx.switchTab({ url: '/pages/records/records' }), 450)
  },

  extendCooling() {
    updateRecord(this.data.id, {
      reviewAt: Date.now() + 3 * 24 * 60 * 60 * 1000,
      routeStage: 0
    })
    wx.showToast({ title: '已延长冷静期', icon: 'none' })
    setTimeout(() => wx.switchTab({ url: '/pages/records/records' }), 450)
  }
})
