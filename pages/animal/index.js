// pages/animal/index.js
var angle=0
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.makeView('heart')

    this.animationInner = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },


  makeView: function(id) {
    var height
    var width
    //创建节点选择器
    var query = wx.createSelectorQuery();
    //选择id
    query.select('#' + id).boundingClientRect()
    query.exec(function(res) {
      //res就是 该元素的信息 数组
      console.log(res);
      height = res[0].height;
      width = res[0].width;
      var context = wx.createCanvasContext('heartc')
      context.setFillStyle('red')
      context.arc(width / 4, height / 2, width / 4, Math.PI, 2 * Math.PI);
      context.arc(3 * width / 4, height / 2, width / 4, Math.PI, 2 * Math.PI);
      context.arc(width / 2, height / 2, width / 2, 0, Math.PI);
      context.fill();
      context.draw()
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.animation()
      setInterval(this.animation,1000)
  },

  animation: function() {
    // this.animationInner.scale(2).step()
    angle=angle+45
    this.animationInner.rotate(angle).step()
    this.setData({
      animationInner: this.animationInner.export()
    })
   
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
  containerTap: function(res) {
    console.log(res.touches[0]);
    var x = res.touches[0].pageX;
    var y = res.touches[0].pageY + 85;
    this.setData({
      rippleStyle: ''
    });
    this.setData({
      rippleStyle: 'top:' + y + 'px;left:' + x + 'px;-webkit-animation: ripple 0.4s linear;animation:ripple 0.4s linear;'
    });
  },
  iconAnimal: function() {

  }
})