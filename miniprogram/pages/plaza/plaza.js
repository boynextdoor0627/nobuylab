const { plazaTopics } = require('../../utils/data')
const { loadState, allPosts, commentCount, toggleLike, addDraft } = require('../../utils/store')

function viewPost(post, state) {
  const liked = (state.likes || []).includes(post.id)
  return Object.assign({}, post, {
    authorFirst: String(post.author || '用').slice(0, 1),
    liked,
    likeCount: Number(post.likes || 0) + (liked ? 1 : 0),
    commentCount: commentCount(post.id)
  })
}

Page({
  data: {
    topics: plazaTopics,
    draftTopics: plazaTopics.filter(item => item !== '推荐'),
    topic: '推荐',
    posts: [],
    showComposer: false,
    draftTopic: '差点买了',
    draftText: ''
  },

  onShow() {
    this.refresh()
  },

  refresh() {
    const state = loadState()
    let posts = allPosts().map(item => viewPost(item, state))
    if (this.data.topic !== '推荐') posts = posts.filter(item => item.topic === this.data.topic)
    this.setData({ posts })
  },

  setTopic(e) {
    this.setData({ topic: e.currentTarget.dataset.topic })
    this.refresh()
  },

  toggleComposer() {
    this.setData({ showComposer: !this.data.showComposer })
  },

  selectDraftTopic(e) {
    this.setData({ draftTopic: e.currentTarget.dataset.topic })
  },

  onDraftInput(e) {
    this.setData({ draftText: e.detail.value })
  },

  submitDraft() {
    const text = this.data.draftText.trim()
    if (!text) {
      wx.showToast({ title: '先写一句动态', icon: 'none' })
      return
    }
    addDraft({
      topic: this.data.draftTopic,
      icon: this.data.draftTopic === '提问' ? '❓' : '🛍️',
      title: text.slice(0, 24),
      summary: text,
      tags: [this.data.draftTopic, '本地草稿']
    })
    this.setData({ draftText: '', showComposer: false, topic: '推荐' })
    this.refresh()
    wx.showToast({ title: '已保存', icon: 'success' })
  },

  toggleLike(e) {
    toggleLike(e.currentTarget.dataset.id)
    this.refresh()
  },

  openPost(e) {
    wx.navigateTo({ url: '/pages/post/post?id=' + e.currentTarget.dataset.id })
  },

  copyShare(e) {
    const post = this.data.posts.find(item => item.id === e.currentTarget.dataset.id)
    if (!post) return
    wx.setClipboardData({
      data: '不买研究所｜' + post.title + '\n' + post.summary,
      success: () => wx.showToast({ title: '分享文案已复制', icon: 'none' })
    })
  }
})
