let app = getApp();
var ctx 
Page({

  data: {
    currentVal: 50, //当前值
    minCurrentVal: 40, //最小值
    maxCurrentVal: 150, //最大值    
    rpx2px: 0.5
  },

  onLoad: function(options) {
    let _this = this;
    ctx = wx.createCanvasContext('canvas');
    _this.getSystemInfo();
    _this.drawRuler();
  },

  //获取系统信息
  getSystemInfo: function() {
    let _this = this;
    wx.getSystemInfo({
      success: function(res) {
        let canvasWidth = res.windowWidth;
        let screenHeight = res.windowHeight;
        _this.setData({
          canvasWidth,
          screenHeight,
          rpx2px: canvasWidth / 750
        })
      }
    })
  },

  drawRuler: function() {
    let _this = this;
    let rpx2px = _this.data.rpx2px
    let color = '177,177,177'; //渐变颜色
    let opacityRange = [{
        range: 0,
        color: 'rgba(' + color + ',0)'
      },
      {
        range: 0.4,
        color: 'rgba(' + color + ',0.5)'
      },
      {
        range: 0.5,
        color: 'rgba(' + color + ',1)'
      }, {
        range: 0.6,
        color: 'rgba(' + color + ',0.5)'
      },
      {
        range: 1,
        color: 'rgba(' + color + ',0)'
      },
    ]

    let canvasWidth = _this.data.canvasWidth;
    const grd = ctx.createLinearGradient(0, 120 * rpx2px, canvasWidth, 120 * rpx2px);
    grd.addColorStop(opacityRange[0].range, opacityRange[0].color);
    grd.addColorStop(opacityRange[1].range, opacityRange[1].color);
    grd.addColorStop(opacityRange[2].range, opacityRange[2].color);
    grd.addColorStop(opacityRange[3].range, opacityRange[3].color);
    ctx.setStrokeStyle(grd)

    let currentVal = _this.data.currentVal * 10;
    let centerPoint = Math.ceil(canvasWidth / 2); //中心点

    let preScale = Math.ceil(centerPoint / 5); //中心点左边平均刻度份数
    let maxVal = Math.ceil(currentVal - centerPoint) + canvasWidth //最大刻度
    let minVal = Math.ceil(currentVal - preScale); //最小刻度

    ctx.setLineWidth(1)
    ctx.setTextAlign('center')

    //中间线
    ctx.beginPath();
    ctx.setStrokeStyle('#16D0FF')
    ctx.setLineWidth(6 * rpx2px)
    ctx.moveTo(centerPoint, 0);
    ctx.lineTo(centerPoint, 100 * rpx2px);
    ctx.closePath();
    ctx.stroke();
    //刻度值
    ctx.beginPath();
    ctx.setFontSize(24 * rpx2px);
    ctx.setStrokeStyle(grd)
    ctx.setFillStyle(grd)
    ctx.setLineWidth(1 * rpx2px)
    let n = 0;
    let drawX = '';
    for (let i = minVal; i <= maxVal; i++) {
      drawX = n * 5 - canvasWidth % 2
      if (i % 10 == 0) {
        ctx.fillText(i > 30 ? i / 10 : '', i >= 30 ? drawX : '', 120 * rpx2px)
        ctx.moveTo(i > 30 ? drawX : '', 0 * rpx2px);
        ctx.lineTo(i > 30 ? drawX : '', 100 * rpx2px);
      } else {
        if (i % 5 != 0) {
          ctx.moveTo(i > 30 ? drawX : '', 20 * rpx2px);
          ctx.lineTo(i > 30 ? drawX : '', 80 * rpx2px);
        } else {
          ctx.moveTo(i > 30 ? drawX : '', 10 * rpx2px);
          ctx.lineTo(i > 30 ? drawX : '', 90 * rpx2px);
        }
      }
      n++
    }
    ctx.stroke();
    ctx.closePath();
    ctx.draw();
  },

  touchStart: 0,
  start: function(e) {
    this.touchStart = e.touches[0].x;
    this.data.touchEnd = this.data.currentVal; //记录鼠标按下时当前的值
  },

  move: function(e) {
    let min = e.touches[0].x - this.touchStart
    let currentVal = (Number(this.data.touchEnd * 5) + Number(-min / 5)).toFixed(1);

    let minCurrentVal = this.data.minCurrentVal * 5;
    let maxCurrentVal = this.data.maxCurrentVal * 5;

    if (currentVal < minCurrentVal) {
      currentVal = minCurrentVal
    }
    if (currentVal > maxCurrentVal) {
      currentVal = maxCurrentVal
    }

    currentVal = (currentVal / 5).toFixed(1);
    this.setData({
      currentVal
    })
    this.drawRuler()
  },

});