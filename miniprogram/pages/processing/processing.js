const { loadState, createCoolingOrder } = require('../../utils/store')

function money(value) {
  const amount = Number(value || 0)
  return amount.toFixed(Number.isInteger(amount) ? 0 : 1)
}

const steps = [
  {
    title: '正在核对模拟账单',
    copy: '确认商品、数量与冷静时间'
  },
  {
    title: '正在虚拟支付',
    copy: '不会唤起微信支付，也不会扣款'
  },
  {
    title: '真实付款已拦截',
    copy: '正在转入不买研究流程'
  }
]

Page({
  data: {
    step: 0,
    title: steps[0].title,
    copy: steps[0].copy,
    itemCount: 0,
    totalText: '0'
  },

  onLoad() {
    const cart = loadState().cart || []
    if (!cart.length) {
      wx.showToast({ title: '没有可处理的商品', icon: 'none' })
      setTimeout(() => wx.navigateBack(), 500)
      return
    }
    const itemCount = cart.reduce((sum, item) => sum + Number(item.qty || 0), 0)
    const total = cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0)
    this.setData({ itemCount, totalText: money(total) })
    this.timers = [
      setTimeout(() => this.advance(1), 650),
      setTimeout(() => this.advance(2), 1450),
      setTimeout(() => this.completeOrder(), 2300)
    ]
  },

  onUnload() {
    const timers = this.timers || []
    timers.forEach(timer => clearTimeout(timer))
  },

  advance(step) {
    this.setData({
      step,
      title: steps[step].title,
      copy: steps[step].copy
    })
  },

  completeOrder() {
    const order = createCoolingOrder(loadState().cart || [])
    if (!order) {
      wx.showToast({ title: '订单创建失败，请重试', icon: 'none' })
      setTimeout(() => wx.navigateBack(), 500)
      return
    }
    wx.switchTab({ url: '/pages/records/records' })
  }
})
