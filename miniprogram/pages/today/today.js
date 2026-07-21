const { pauseOptions } = require('../../utils/data')
const { createPauseRecord, loadState, stats, dateKey } = require('../../utils/store')

Page({
  data: {
    pauseOptions,
    selectedId: 'food',
    name: '',
    amount: '',
    stats: {},
    todayDone: false,
    weeklyDots: 0,
    dotList: [1, 2, 3, 4, 5, 6, 7]
  },

  onShow() {
    this.refresh()
  },

  refresh() {
    const state = loadState()
    const today = dateKey()
    const records = state.records || []
    const todayDone = records.some(item => dateKey(new Date(item.createdAt)) === today)
    this.setData({
      stats: stats(),
      todayDone,
      weeklyDots: Math.min(7, records.slice(0, 7).length)
    })
  },

  selectOption(e) {
    this.setData({ selectedId: e.currentTarget.dataset.id })
  },

  onNameInput(e) {
    this.setData({ name: e.detail.value })
  },

  onAmountInput(e) {
    this.setData({ amount: e.detail.value })
  },

  submitPause() {
    const option = pauseOptions.find(item => item.id === this.data.selectedId) || pauseOptions[0]
    createPauseRecord(option, {
      name: this.data.name.trim(),
      amount: this.data.amount
    })
    this.setData({ name: '', amount: '' })
    this.refresh()
    wx.showToast({ title: '已进入冷静记录', icon: 'success' })
    setTimeout(() => {
      wx.switchTab({ url: '/pages/records/records' })
    }, 450)
  }
})
