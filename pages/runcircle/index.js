// pages/runcircle/index.js
var step = Math.PI * 2 / 360 * 1
var stepCounts = 0;
var dua = 50;
var ctx
var cw
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that=this
    console.log("onLoad")
    this.pixelRatio = wx.getStorageSync("pixelRatio")
    this.windowWidth = wx.getStorageSync("windowWidth")
    ctx = wx.createCanvasContext("canvas-circle", this)
    //创建节点选择器
    var query = wx.createSelectorQuery();
    //选择id
    query.select('#canvas-id' ).boundingClientRect()
    query.exec(function(res) {
      //res就是 该元素的信息 数组
      console.log(res);
      // cw = res[0].height;
      cw = res[0].width;
      that.drawCircleOut()
    })
  },

  drawCircleOut: function() {
    // console.log("drawCircleOut1:" + new Date())
    
    ctx.beginPath();
    ctx.setStrokeStyle('blue')
    ctx.beginPath();
    ctx.moveTo(cw/4, cw/2);          // Create a horizontal line
    ctx.arcTo(cw/2, 0, 3/4*cw, cw/2, 80); // Create an arc   
    ctx.stroke();                // Draw it
   

    stepCounts = stepCounts + 1;

    // var cw = this.windowWidth / 750 * 600

    var r1 = cw / 2 - this.windowWidth / 750 * 90;
    var r2 = r1 - this.windowWidth / 750 * 40;
    var r0 = r2 - this.windowWidth / 750 * 10;
    var r3 = r0 - this.windowWidth / 750 * 20;
    var r4 = r3 - this.windowWidth / 750 * 40;

    ctx.beginPath()
    ctx.lineWidth = this.windowWidth / 750 * 1;
    ctx.setStrokeStyle('#89C25C')
    ctx.arc(cw / 2, cw / 2, r0, 0, Math.PI * 2)
    ctx.stroke()

    var count = 90;
    for (var i = 0; i < count; i++) {
      var radian = 2 * Math.PI * i / count
      var radian2 = radian - (step * stepCounts)
      var x = Math.sin(radian2);
      var y = Math.cos(radian2);
      var x3 = r3 * x + cw / 2;
      var y3 = r3 * y + cw / 2;
      var x4 = r4 * x + cw / 2;
      var y4 = r4 * y + cw / 2;

      ctx.beginPath()
      ctx.setStrokeStyle('#89C25C')
      ctx.lineCap = "round";
      ctx.lineWidth = this.windowWidth / 750 * 4;
      ctx.moveTo(x3, y3)
      ctx.lineTo(x4, y4)
      ctx.stroke()
      
      var radian1 = radian + (step * stepCounts)
      var x = Math.sin(radian1);
      var y = Math.cos(radian1);
      var x1 = r1 * x + cw / 2;
      var y1 = r1 * y + cw / 2;
      var x2 = r2 * x + cw / 2;
      var y2 = r2 * y + cw / 2;
      ctx.beginPath()
      ctx.lineCap = "round";
      ctx.lineWidth = this.windowWidth / 750 * 5;
      var grd = ctx.createLinearGradient(x1, y1, x2, y2)
      grd.addColorStop(0, '#F2254E')
      grd.addColorStop(1, '#A8086C')
      ctx.setStrokeStyle(grd)
      // ctx.setStrokeStyle('rgba(242, 37, 78, 1)')
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()

     
    }

   

    ctx.draw(false) //是否保留当前画布内容
    // console.log("drawCircleOut2:" + new Date())
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log("onReady")
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("onShow")
   
  },

  start: function() {
    if (this.intervalId == undefined) {
      this.intervalId = setInterval(this.drawCircleOut, dua)
    }
  },
  stop: function() {
    clearInterval(this.intervalId)
    this.intervalId = undefined;
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
    this.stop();
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