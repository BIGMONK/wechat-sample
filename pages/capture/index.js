// pages/capture/index.js
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
    this.ctx = wx.createCanvasContext("share-image")
    this.pixelRatio = wx.getSystemInfoSync().pixelRatio
    this.width = wx.getSystemInfoSync().windowWidth
    this.heigh = wx.getSystemInfoSync().windowHeight
    this.ratio = 320 * this.heigh / 568 / this.width
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
  showResult() {
    this.setData({
      showDialog: true
    })
  },


  save: function() {

    var dddd = [{
      name: '转速',
      unit: 'rpm',
      values: [
        [0.5, 50],
        [1, 60],
        [0, 0]
      ]
    }, {
      name: '速度',
      unit: 'km/h',
      values: [
        [0.5, 50],
        [1, 160],
        [0.2, 20]
      ]
    }]

    dddd = [{
      name: '桨频',
      unit: 'spm',
      values: [
        [0.5, 50],
        [1, 60],
        [0, 0]
      ]
    }, {
      name: '速度',
      unit: 'km/h',
      values: [
        [0.5, 50],
        [1, 160],
        [0.2, 20]
      ]
    }, {
      name: '桨幅',
      unit: '米/次',
      values: [
        [0.5, 50],
        [1, 160],
        [0.2, 20]
      ]
    }]

    this.draw(this.ctx, 'share-image', 1, "10:05", [100, 1000], dddd, res => {
      console.log(res)
      if (res.errMsg == "drawCanvas:ok") {
        this.canvasToTempFilePath()
      } else {
        wx.showToast({
          title: '生成图片失败',
        })
      }
    }, [100, 500])

  },

  /**
   * mileAndCal:[100,1000]
   * detailDatas:[{name:'转速',unit:'rpm',[[0.5,50],[1,60],[0,0]]},{name:'速度',unit:'km/h',[[0.5,50],[1,60],[0,0]]}]
   */
  draw(ctx, canvansId, deviceType, time, mileAndCal, detailDatas, listen, ovaAndPower ) {
    this.setData({
      showDialog2: true
    })
    var that = this
    //缩小绘制  缩小显示  放大保存
    // ui 750*1334
    //绘制 缩小为0.8
    var bili = 0.8 * this.width / 750 //转换成px并缩小
    var xm = 750 / 2 * bili
    // 背景
    ctx.clearRect(0, 0, 750 * bili, 1334 * this.ratio * (bili))
    ctx.beginPath()
    ctx.setFillStyle("#232943")
    ctx.fillRect(0, 0, 750 * bili, 1334 * this.ratio * (bili))
   
    // 报告标题
   
    var text1Size = 60 * bili;
    ctx.setFontSize(text1Size)
    ctx.setFillStyle("#FFFFFF")
    var t = 'Report'
    var tw = ctx.measureText(t)
    var x = 44 * bili
    var y = 80 * bili + text1Size
    ctx.fillText(t, x, y * this.ratio)
    
    // 标题下划线
   
    x = 44 * bili
    y = (170 + 3) * bili * this.ratio
    var grd = ctx.createLinearGradient(x, y, x + 652 * bili, y)
    grd.addColorStop(0, '#60A931')
    grd.addColorStop(1, '#9CCB6D')
    ctx.setStrokeStyle(grd)
    ctx.setLineWidth(6 * bili)
    ctx.moveTo(x, y)
    ctx.lineTo(x + 652 * bili, y)
    ctx.stroke()
   
    // 用时
   
    var text2Size = 30 * bili;
    ctx.setFontSize(text2Size)
    ctx.setFillStyle("#FFFFFF")
    t = '用时'
    tw = ctx.measureText(t)
    x = xm - tw.width / 2
    y = (deviceType == 0 ? 234 : 209) * bili + text2Size
    ctx.fillText(t, x, y * this.ratio)
    
    var text3Size = 80 * bili;
    ctx.setFontSize(text3Size)
    ctx.setFillStyle("#FFFFFF")
    ctx.setStrokeStyle('#FFFFFF')
    t = time
    tw = ctx.measureText(t)
    x = xm - tw.width / 2
    y = (deviceType == 0 ? 296 : 264) * bili + text3Size
    ctx.fillText(t, x, y * this.ratio)
   
    var macNames = [
      ['里程', '卡路里'], mileAndCal, ['km', 'kcal']
    ]
    var detaX = xm
    for (var i = 0; i < mileAndCal.length; i++) {
      // 名称
     
      ctx.setFontSize(text2Size)
      ctx.setFillStyle("#60A931")
      t = macNames[0][i]
      tw = ctx.measureText(t)
      x = xm / 2 + detaX * i - tw.width / 2
      y = (deviceType == 0 ? 431 : 348) * bili + text2Size
      ctx.fillText(t, x, y * this.ratio)
      //数值
     
      ctx.setFontSize(text3Size)
      ctx.setFillStyle("#60A931")
      t = macNames[1][i] + ""
      tw = ctx.measureText(t)
      x = xm / 2 + detaX * i - tw.width / 3 * 2
      y = (deviceType == 0 ? 516 : 402) * bili + text3Size
      ctx.fillText(t, x, y * this.ratio)
      //单位
     
      ctx.setFontSize(text2Size)
      ctx.setFillStyle("#FFFFFF")
      t = macNames[2][i]
      x = xm / 2 + detaX * i + tw.width / 2
      ctx.fillText(t, x, y * this.ratio)
      
    }
    var progressNames = ["AVG", "MAX", "MIN"]
    var startColors = ["#296AB4", "#F2254E", "#FFDB2E"]
    var endColors = ["#30A6DF", "#A8086C", "#FCCF38"]
    var dis = 160 * bili
    for (var j = 0; j < detailDatas.length; j++) {
      var item = detailDatas[j]
      //名称
     
      var textSize36 = 36 * bili;
      ctx.setFontSize(textSize36)
      ctx.setFillStyle("#FFFFFF")
      t = item.name
      tw = ctx.measureText(t)
      x = 113 * bili
      y = (deviceType == 0 ? 727 : 548) * bili + textSize36 + j * dis
      ctx.fillText(t, x, y * this.ratio)
      // 单位
     
      var textSize24 = 24 * bili;
      ctx.setFontSize(textSize24)
      ctx.setFillStyle("#FFFFFF")
      t = item.unit
      x = x + tw.width / 2
      tw = ctx.measureText(t)
      x = x - tw.width / 2
      y = (deviceType == 0 ? 786 : 607) * bili + textSize24 + j * dis
      ctx.fillText(t, x, y * this.ratio)
     
      // 图块背景
      ctx.setFillStyle("#313550")
      var x = 216 * bili
      var y = ((deviceType == 0 ? 704 : 525) * bili + j * dis) * this.ratio
      var r = 20 * bili * this.ratio
      var xxww = 428
      var yyhh = 120 * this.ratio
      ctx.beginPath()
      ctx.moveTo(x + r, y)
      ctx.lineTo(x + r + xxww * bili - 2 * r, y)
      ctx.arc(x + r + xxww * bili - 2 * r, y + r, r, 1.5 * Math.PI, 2 * Math.PI)
      ctx.lineTo(x + r + xxww * bili - r, y + yyhh * bili - r)
      ctx.arc(x + xxww * bili - r, y + yyhh * bili - r, r, 0, 0.5 * Math.PI)
      ctx.lineTo(x + r, y + yyhh * bili)
      ctx.arc(x + r, y + yyhh * bili - r, r, 0.5 * Math.PI, Math.PI)
      ctx.lineTo(x, y + r)
      ctx.arc(x + r, y + r, r, Math.PI, 1.5 * Math.PI)
      ctx.closePath()
      ctx.fill()
     
      var ix = x + 49 * bili
      var ix2 = x + 100 * bili
      var ix3 = x + 387 * bili
      var ih = (120 * bili / 3) * this.ratio
      var iy = y + ih / 2
      for (var i = 0; i < 3; i++) {
        var vvs = item.values
        //进度条名称
       
        var textSize24 = 24 * bili;
        ctx.setFontSize(textSize24)
        ctx.setFillStyle("#4D516B")
        t = progressNames[i]
        tw = ctx.measureText(t)
        ctx.fillText(t, ix - tw.width / 2, iy + textSize24 / 2 + i * ih)
       
        // 背景线条
        var lineLength = 244 * bili
        ctx.beginPath()
        ctx.setLineWidth(1 * bili)
        ctx.setStrokeStyle("#4B4F69")
        ctx.moveTo(ix2, iy + i * ih)
        var rr = 10 * bili
        ctx.arc(ix2 + rr, iy + i * ih, rr, 0.5 * Math.PI, 1.5 * Math.PI)
        ctx.lineTo(ix2 + lineLength - 2 * rr, iy + i * ih - rr)
        ctx.arc(ix2 + lineLength - 2 * rr, iy + i * ih, rr, 1.5 * Math.PI, 2.5 * Math.PI)
        ctx.lineTo(ix2 + rr, iy + i * ih + rr)
        ctx.arc(ix2 + rr, iy + i * ih, rr, 0.5 * Math.PI, Math.PI)
        ctx.closePath()
        ctx.stroke()
      
        // 实线条
        var p = lineLength * vvs[i][0]
        if (p > 0) {
          ctx.beginPath()
          var grd = ctx.createLinearGradient(x, y, x + 652 * bili, y)
          grd.addColorStop(0, startColors[i])
          grd.addColorStop(1, endColors[i])
          ctx.setFillStyle(grd)
          ctx.moveTo(ix2, iy + i * ih)
          var rr = 10 * bili
          ctx.arc(ix2 + rr, iy + i * ih, rr, 0.5 * Math.PI, 1.5 * Math.PI)
          ctx.lineTo(ix2 + p - 2 * rr, iy + i * ih - rr)
          ctx.arc(ix2 + p - 2 * rr, iy + i * ih, rr, 1.5 * Math.PI, 2.5 * Math.PI)
          ctx.lineTo(ix2 + rr, iy + i * ih + rr)
          ctx.fill()         
        }

        //进度条值
        
        var textSize40 = 40 * bili;
        ctx.setFontSize(textSize40)
        ctx.setFillStyle(endColors[i])
        t = vvs[i][1] + ""
        tw = ctx.measureText(t)
        ctx.fillText(t, ix3 - tw.width / 2, iy + textSize40 / 2 + i * ih)        
      }
    }
    // 绘制桨频和功率
    var opns = ['桨数', "功率"]
    var opus = ['次', '瓦']
    if (deviceType == 1 && ovaAndPower != undefined) {
      var textSizeName = 36 * bili
      var textSizeValue = 50 * bili
      var textSizeUnit = 24 * bili

      for (var k = 0; k < ovaAndPower.length; k++) {
        //名称
        var x = 113 * bili + xm * k * 0.7
        var y = (1040 * bili + textSizeName / 2) * this.ratio
        ctx.setFillStyle("#ffffff")
        ctx.setFontSize(textSizeName)
        var text = opns[k] + ""
        var tw = ctx.measureText(text)
        ctx.fillText(text, x, y)
        //数值背景
        var bbw = 163 * bili
        var bbh = 40 * bili
        var bbr = 20 * bili
        var bboff = 100 * bili
        ctx.beginPath()
        ctx.setFillStyle("#313550")
        ctx.moveTo(x + bboff, y - textSizeName / 2)
        ctx.lineTo(x + bboff, y - textSizeName / 2 - bbh + bbr)
        ctx.arc(x + bboff + bbr, y - textSizeName / 2 - bbh + bbr, bbr, Math.PI, 1.5 * Math.PI)
        ctx.lineTo(x + bboff + bbw - bbr, y - textSizeName / 2 - bbh)
        ctx.arc(x + bboff + bbw - bbr, y - textSizeName / 2 - bbh + bbr, bbr, 1.5 * Math.PI, 2 * Math.PI)
        ctx.lineTo(x + bboff + bbw, y - textSizeName / 2 + bbh - bbr)
        ctx.arc(x + bboff + bbw - bbr, y - textSizeName / 2 + bbh - bbr, bbr, 0, 0.5 * Math.PI)
        ctx.lineTo(x + bboff + bbr, y - textSizeName / 2 + bbh)
        ctx.arc(x + bboff + bbr, y - textSizeName / 2 + bbh - bbr, bbr, 0.5 * Math.PI, Math.PI)
        ctx.closePath()
        ctx.fill()
        //数值和单位      
        ctx.beginPath()
        ctx.setFillStyle("#ffffff")
        ctx.setFontSize(textSizeUnit)
        var text = opus[k] + ""
        var utw = ctx.measureText(text)
        var ux = x + bboff + bbw - utw.width * 1.5
        var uy = y + textSizeUnit / 2
        ctx.fillText(text, ux, uy)

        ctx.beginPath()
        ctx.setFillStyle("#ffffff")
        ctx.setFontSize(textSizeValue)
        var text = ovaAndPower[k] + ""
        var tw = ctx.measureText(text)
        x = x + bboff + bbw - tw.width - utw.width * 1.5
        y = y + textSizeUnit / 2
        ctx.fillText(text, x, y)
      }

    }

    // 绘制二维码
    var b = 200 * bili
    var x = xm - b / 2
    var y = (1334 * bili - b) * this.ratio
    ctx.drawImage('minicode.jpg', x, y, b, b)

    ctx.draw(true, res => {
      listen(res)
    })
  },


  canvasToTempFilePath(canvansId) {
    var that = this
    wx.canvasToTempFilePath({
      canvasId: canvansId,
      success(res) {
        var tempFilePath = res.tempFilePath;
        console.log("canvasToTempFilePath success:" + tempFilePath)
        that.setData({
          shareimageshow: tempFilePath,
          shareImageHidden: "share-image-hidden"
        })
        that.saveImageToPhotosAlbum(tempFilePath)
      },
      fail: function(res) {
        console.log("canvasToTempFilePath fail:" + JSON.stringify(res))
        wx.showToast({
          title: '缓存图片失败',
        })
      }
    })
  },
  saveImageToPhotosAlbum(url) {
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: url,
      success(res) {
        console.log('saveImageToPhotosAlbum:' + JSON.stringify(res))
        wx.showToast({
          title: '图片已保存到相册',
        })
      },
      fail: function(res) {
        wx.showToast({
          title: '图片保存失败',
        })
      }
    })
  },
  back() {
    this.setData({
      showDialog: false
    })
  },
  back2() {
    this.setData({
      showDialog2: false
    })
  }
})