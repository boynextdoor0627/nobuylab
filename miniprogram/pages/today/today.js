const { shopCategories, shopProducts } = require('../../utils/data')
const {
  loadState,
  addCartItem,
  changeCartItem,
  clearCart: clearStoredCart
} = require('../../utils/store')

function money(value) {
  const amount = Number(value || 0)
  return amount.toFixed(Number.isInteger(amount) ? 0 : 1)
}

Page({
  data: {
    categories: shopCategories,
    activeCategory: 'all',
    products: [],
    cart: [],
    cartCount: 0,
    cartTotalText: '0',
    cartOpen: false,
    customOpen: false,
    customName: '',
    customPrice: ''
  },

  onShow() {
    this.refresh()
  },

  refresh() {
    const state = loadState()
    const cart = state.cart || []
    const qtyMap = {}
    cart.forEach(item => {
      qtyMap[item.id] = Number(item.qty || 0)
    })
    const products = shopProducts
      .filter(item => this.data.activeCategory === 'all' || item.category === this.data.activeCategory)
      .map(item => Object.assign({}, item, {
        priceText: money(item.price),
        inCartQty: qtyMap[item.id] || 0
      }))
    const cartView = cart.map(item => Object.assign({}, item, {
      priceText: money(item.price),
      lineTotalText: money(Number(item.price || 0) * Number(item.qty || 0))
    }))
    const cartCount = cart.reduce((sum, item) => sum + Number(item.qty || 0), 0)
    const cartTotal = cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0)
    this.setData({
      products,
      cart: cartView,
      cartCount,
      cartTotalText: money(cartTotal)
    })
  },

  setCategory(e) {
    this.setData({ activeCategory: e.currentTarget.dataset.id })
    this.refresh()
  },

  addProduct(e) {
    const product = shopProducts.find(item => item.id === e.currentTarget.dataset.id)
    if (!product) return
    addCartItem(product)
    this.refresh()
  },

  toggleCustom() {
    this.setData({ customOpen: !this.data.customOpen })
  },

  onCustomName(e) {
    this.setData({ customName: e.detail.value })
  },

  onCustomPrice(e) {
    this.setData({ customPrice: e.detail.value })
  },

  addCustomProduct() {
    const name = this.data.customName.trim()
    const price = Number(this.data.customPrice || 0)
    if (!name || price <= 0) {
      wx.showToast({ title: '填写名称和金额后再加入', icon: 'none' })
      return
    }
    const category = shopCategories.find(item => item.id === this.data.activeCategory)
    addCartItem({
      id: 'custom-' + Date.now(),
      category: category && category.id !== 'all' ? category.id : 'other',
      categoryLabel: category && category.id !== 'all' ? category.label : '其他',
      name,
      note: '我自己添加的商品',
      price,
      icon: '🛍️',
      iconPath: '/runtime-assets/icons/3d-present.png',
      coolingMinutes: 1440
    })
    this.setData({ customName: '', customPrice: '', customOpen: false, cartOpen: true })
    this.refresh()
  },

  toggleCart() {
    this.setData({ cartOpen: !this.data.cartOpen })
  },

  closeCart() {
    this.setData({ cartOpen: false })
  },

  noop() {},

  changeQty(e) {
    changeCartItem(e.currentTarget.dataset.id, Number(e.currentTarget.dataset.delta || 0))
    this.refresh()
    if (!this.data.cartCount) this.setData({ cartOpen: false })
  },

  clearCart() {
    clearStoredCart()
    this.setData({ cartOpen: false })
    this.refresh()
  },

  goCheckout() {
    const cart = loadState().cart || []
    if (!cart.length) {
      wx.showToast({ title: '购物车还是空的', icon: 'none' })
      return
    }
    this.setData({ cartOpen: false })
    wx.navigateTo({ url: '/pages/checkout/checkout' })
  }
})
