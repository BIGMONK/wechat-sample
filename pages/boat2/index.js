// pages/boat/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reversal: false,
    animation: false,
    going: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  gogo: function () {
    console.log("go:" + this.data.going)
    if (this.data.going) {
      this.stopAnimation()
      clearInterval(this.reversalIntervalId)
      this.setData({
        reversal: false,
        going: false
      })
    } else {
      this.startAnimation()
      this.reversalIntervalId = setInterval(this.startReversal, 1000)
      this.setData({
        going: true
      })
    }
  },
  startReversal: function () {
    this.setData({
      reversal: !this.data.reversal
    })
  },
  startAnimation: function () {
    this.setData({
      animation: true
    })
  },
  stopAnimation: function () {
    this.setData({
      animation: false
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.startAnimation()
    this.reversalIntervalId = setInterval(this.startReversal, 1000)
    this.setData({
      going: true
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})