const { findPost, postComments, addComment } = require('../../utils/store')

Page({
  data: {
    id: '',
    post: null,
    comments: [],
    commentText: ''
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
    this.setData({
      post,
      comments: postComments(this.data.id)
    })
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
