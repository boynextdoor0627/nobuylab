const { loadState, stats } = require('../../utils/store')

function money(value) {
  const amount = Number(value || 0)
  return amount.toFixed(Number.isInteger(amount) ? 0 : 1)
}

function dateText(ts) {
  const date = new Date(ts)
  return (date.getMonth() + 1) + '月' + date.getDate() + '日'
}

Page({
  data: {
    savedRecords: [],
    stats: {},
    averageText: '0',
    savedDays: 0
  },

  onShow() {
    this.refresh()
  },

  refresh() {
    const state = loadState()
    const savedRecords = (state.records || [])
      .filter(item => item.decision === 'kept')
      .map(item => Object.assign({}, item, {
        iconPath: item.iconPath || '/runtime-assets/icons/3d-present.png',
        amountText: money(item.amount),
        dateText: dateText(item.reviewedAt || item.createdAt),
        orderNo: item.orderNo || String(item.id || '').slice(-8)
      }))
    const total = savedRecords.reduce((sum, item) => sum + Number(item.amount || 0), 0)
    const days = new Set(savedRecords.map(item => dateText(item.reviewedAt || item.createdAt))).size
    this.setData({
      savedRecords,
      stats: stats(),
      averageText: money(savedRecords.length ? total / savedRecords.length : 0),
      savedDays: days
    })
  },

  copyReceipt() {
    if (!this.data.savedRecords.length) return
    const lines = this.data.savedRecords.slice(0, 6).map(item => {
      return item.dateText + '｜' + item.name + '｜省下 ¥' + item.amountText
    })
    wx.setClipboardData({
      data: '不买研究所｜我的省钱账单\n累计省下 ¥' + this.data.stats.confirmedSaved + '\n' + lines.join('\n'),
      success: () => wx.showToast({ title: '省钱账单已复制', icon: 'none' })
    })
  },

  goShop() {
    wx.switchTab({ url: '/pages/today/today' })
  }
})
