const { loadState } = require('../../utils/store')

function money(value) {
  const amount = Number(value || 0)
  return amount.toFixed(Number.isInteger(amount) ? 0 : 1)
}

Page({
  data: {
    cart: [],
    cartCount: 0,
    totalText: '0',
    empty: false,
    submitting: false
  },

  onShow() {
    this.refresh()
  },

  refresh() {
    const cart = loadState().cart || []
    const cartCount = cart.reduce((sum, item) => sum + Number(item.qty || 0), 0)
    const total = cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0)
    this.setData({
      cart: cart.map(item => Object.assign({}, item, {
        lineTotalText: money(Number(item.price || 0) * Number(item.qty || 0))
      })),
      cartCount,
      totalText: money(total),
      empty: !cart.length,
      submitting: false
    })
  },

  backToCart() {
    wx.navigateBack()
  },

  confirmOrder() {
    if (this.data.submitting) return
    const cart = loadState().cart || []
    if (!cart.length) {
      wx.showToast({ title: '购物车已经空了', icon: 'none' })
      return
    }
    this.setData({ submitting: true })
    wx.navigateTo({
      url: '/pages/processing/processing',
      fail: () => this.setData({ submitting: false })
    })
  }
})
