const { plazaTopics } = require('../../utils/data')
const { loadState, allPosts, postComments, commentCount, toggleLike, toggleFavorite, addDraft } = require('../../utils/store')

function viewPost(post, state) {
  const liked = (state.likes || []).includes(post.id)
  const favorited = (state.favorites || []).includes(post.id)
  const commented = postComments(post.id).some(item => item.name === '我')
  return Object.assign({}, post, {
    authorFirst: String(post.author || '用').slice(0, 1),
    liked,
    favorited,
    likeIcon: liked ? '/runtime-assets/icons/reaction-like.png' : '/runtime-assets/icons/reaction-default.png',
    commented,
    commentIcon: commented ? '/runtime-assets/icons/reaction-comment-active.png' : '/runtime-assets/icons/reaction-comment.png',
    saveIcon: favorited ? '/runtime-assets/icons/reaction-save-active.png' : '/runtime-assets/icons/reaction-save.png',
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
    draftText: '',
    draftImage: ''
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

  chooseDraftImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sizeType: ['compressed'],
      success: res => {
        const tempFilePath = res.tempFiles[0] && res.tempFiles[0].tempFilePath
        if (!tempFilePath) return
        wx.saveFile({
          tempFilePath,
          success: saved => this.setData({ draftImage: saved.savedFilePath }),
          fail: () => this.setData({ draftImage: tempFilePath })
        })
      }
    })
  },

  removeDraftImage() {
    this.setData({ draftImage: '' })
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
      iconPath: this.data.draftTopic === '提问' ? '/runtime-assets/icons/3d-map.png' : '/runtime-assets/icons/3d-photo.png',
      title: text.slice(0, 24),
      summary: text,
      photo: this.data.draftImage,
      tags: [this.data.draftTopic, '本地草稿']
    })
    this.setData({ draftText: '', draftImage: '', showComposer: false, topic: '推荐' })
    this.refresh()
    wx.showToast({ title: '已保存', icon: 'success' })
  },

  toggleLike(e) {
    toggleLike(e.currentTarget.dataset.id)
    this.refresh()
  },

  toggleFavorite(e) {
    toggleFavorite(e.currentTarget.dataset.id)
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
