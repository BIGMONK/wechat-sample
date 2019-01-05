// pages/pulltorefresh/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      "rowNo": "263",
      "nickName": "别邀请我",
      "calorie": 3443,
      "id": 24593,
      "type": 1,
      "userId": 115,
      "speed": 1035.1,
      "picture": "http://192.168.1.124/image/photo/tmp_9f8a1fe7500af149d9c0d5b4d2db04e53bb5da824faa2825.jpg",
      "mileage": 127.89,
      "usetime": 37330
    }, {
      "nickName": "建鹏liu ",
      "calorie": 6,
      "id": 24787,
      "type": 1,
      "userId": 7941,
      "speed": 1.4,
      "picture": "default.png",
      "mileage": 0.13,
      "usetime": 354
    }, {
      "nickName": "转山",
      "calorie": 9,
      "id": 24740,
      "type": 1,
      "userId": 8123,
      "speed": 5.1,
      "picture": "default.png",
      "mileage": 0.2,
      "usetime": 141
    }, {
      "nickName": "H&M",
      "calorie": 15,
      "id": 24627,
      "type": 1,
      "userId": 9035,
      "speed": 8.9,
      "picture": "20171117183041.png",
      "mileage": 0.29,
      "usetime": 122
    }, {
      "nickName": "JOY",
      "calorie": 16,
      "id": 24623,
      "type": 1,
      "userId": 9032,
      "speed": 5.7,
      "picture": "default.png",
      "mileage": 0.29,
      "usetime": 194
    }, {
      "nickName": "我",
      "calorie": 7,
      "id": 28199,
      "type": 1,
      "userId": 9556,
      "speed": 8.1,
      "picture": "IMG_20180823102109.jpg",
      "mileage": 0.31,
      "usetime": 141
    }, {
      "nickName": "CAI",
      "calorie": 17,
      "id": 24786,
      "type": 1,
      "userId": 9069,
      "speed": 1.9,
      "picture": "default.png",
      "mileage": 0.31,
      "usetime": 603
    }, {
      "nickName": "一灵",
      "calorie": 14,
      "id": 27363,
      "type": 1,
      "userId": 7980,
      "speed": 9.6,
      "picture": "18355253191_20170528122227.jpg",
      "mileage": 0.34,
      "usetime": 134
    }, {
      "nickName": "钱春易",
      "calorie": 36,
      "id": 26003,
      "type": 1,
      "userId": 9465,
      "speed": 7.6,
      "picture": "default.png",
      "mileage": 0.4,
      "usetime": 189
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  },
  
  upper(e) {
    console.log("upper=" + JSON.stringify(e))
  },
  lower(e) {
    console.log("lower=" + JSON.stringify(e))
  }
})