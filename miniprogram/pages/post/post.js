const { loadState, findPost, postComments, commentCount, toggleLike, toggleFavorite, addComment } = require('../../utils/store')

Page({
  data: {
    id: '',
    post: null,
    comments: [],
    commentText: '',
    commentFocus: false
  },

  onLoad(query) {
    this.setData({ id: query.id || '' })
    this.refresh()
  },

  refresh() {
    const post = findPost(this.data.id)
    if (!post) {
      wx.showToast({ title: '动态不存在', icon: 'none' })
      setTimeout(() => wx.navigateBack(), 500)
      return
    }
    const state = loadState()
    const liked = (state.likes || []).includes(post.id)
    const favorited = (state.favorites || []).includes(post.id)
    this.setData({
      post: Object.assign({}, post, {
        authorFirst: String(post.author || '用').slice(0, 1),
        articleText: (post.body || []).join(' '),
        liked,
        favorited,
        likeIcon: liked ? '/assets/icons/reaction-like.png' : '/assets/icons/reaction-default.png',
        commentIcon: '/assets/icons/reaction-comment.png',
        saveIcon: favorited ? '/assets/icons/reaction-save-active.png' : '/assets/icons/reaction-save.png',
        likeCount: Number(post.likes || 0) + (liked ? 1 : 0),
        commentCount: commentCount(post.id)
      }),
      comments: postComments(this.data.id).map((item, index) => Object.assign({}, item, {
        nameFirst: String(item.name || '用').slice(0, 1),
        commentKey: item.createdAt || String(item.name || 'user') + '-' + index
      }))
    })
  },

  toggleLike() {
    toggleLike(this.data.id)
    this.refresh()
  },

  toggleFavorite() {
    toggleFavorite(this.data.id)
    this.refresh()
    wx.showToast({ title: this.data.post.favorited ? '已收藏' : '已取消', icon: 'none' })
  },

  copyShare() {
    const post = this.data.post
    if (!post) return
    wx.setClipboardData({
      data: '不买研究所｜' + post.title + '\n' + post.summary,
      success: () => wx.showToast({ title: '分享文案已复制', icon: 'none' })
    })
  },

  focusComment() {
    this.setData({ commentFocus: true })
  },

  onCommentBlur() {
    this.setData({ commentFocus: false })
  },

  onCommentInput(e) {
    this.setData({ commentText: e.detail.value })
  },

  submitComment() {
    const text = this.data.commentText.trim()
    if (!text) {
      wx.showToast({ title: '先写一句评论', icon: 'none' })
      return
    }
    addComment(this.data.id, text)
    this.setData({ commentText: '' })
    this.refresh()
    wx.showToast({ title: '评论已保存', icon: 'success' })
  }
})
