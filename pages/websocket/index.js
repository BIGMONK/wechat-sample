// pages/websocket/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      log:'',
  },
  connectWebsocket: function () {
    var that=this;
    this.setData({
      log:"点击链接"
    })

    wx.connectSocket({
      url: 'ws://115.29.198.179:8085/webSocketServer.action',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success(res) {
        console.log('connectSocket success' + JSON.stringify(res))
        that.setData({
          log: 'connectSocket success:' + JSON.stringify(res)
        })
      },
      fail(res) {
        console.log('connectSocket fail' + JSON.stringify(res))
        that.setData({
          log: 'connectSocket fail:' + JSON.stringify(res)
        })
      }
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！' + JSON.stringify(res))
      that.setData({
        log: 'WebSocket连接已打开！' + JSON.stringify(res)
      })
    })
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！' + JSON.stringify(res))
      that.setData({
        log: 'WebSocket连接打开失败，请检查！' + JSON.stringify(res)
      })
    })
    wx.onSocketMessage(function (res) {
      console.log('收到服务器内容：' +  JSON.stringify(res))
      that.setData({
        log: '收到服务器内容：' + JSON.stringify(res)
      })
    })
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！' + JSON.stringify(res))
      that.setData({
        log: 'WebSocket 已关闭！' + JSON.stringify(res)
      })
    })
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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