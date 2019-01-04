// pages/arraysort/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [1, 0, 'a', 11, '1', 'A', '11', 'abasdfasfasfdasfsdc', 'bcd', '012', '123', 'a不', '八a', '啊', '不', '八']
  },

  sortByChar(a, b) {
    var a1 = a + ''
    var b1 = b + ''
    if (a1.charCodeAt(0) > 127 || b1.charCodeAt(0) > 127) {
      return (b + '').localeCompare(a + '')
    } else {
      return (a + '').localeCompare(b + '')
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      array: this.data.array.sort(function(a, b) {
        // return (a + '').localeCompare(b + '')
        var a1 = a + ''
        var b1 = b + ''
        if (a1.charCodeAt(0) > 127 || b1.charCodeAt(0) > 127) {
          return (b + '').localeCompare(a + '')
        } else {
          return (a + '').localeCompare(b + '')
        }
      })
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})