var Locker = class {
  constructor(page, opt) {
    // console.log("constructor=" + JSON.stringify(page) + "************" + JSON.stringify(opt))
    this.page = page;
    var obj = opt || {};
    this.width = obj.width || 300;
    this.height = obj.height || 300;
    this.canvasId = obj.id || 'canvas';
    this.cleColor = obj.cleColor || '#CFE6FF';
    this.cleCenterColor = obj.cleCenterColor || '#CFE6FF';
    var chooseType = obj.chooseType || 3;
    // 判断是否缓存有chooseType，有就用缓存，没有就用传入的值
    this.chooseType = Number(wx.getStorageSync('chooseType')) || chooseType;
    this.startedCircle = obj.startedCircle||false;//起始点是否要在解锁点上
    this.init();
  }
  /**
   * 初始化屏幕锁
   */
  init() {
    // console.log("pswObj=" + wx.getStorageSync('passwordxx'))
    // 获取已存储锁屏密码
    this.pswObj = wx.getStorageSync('passwordxx') ? {
      step: 2, //2表示锁屏密码已存在，需要解锁
      spassword: JSON.parse(wx.getStorageSync('passwordxx'))
    } : {};
    // console.log("pswObj=" + JSON.stringify(this.pswObj))

    this.makeState();
    // 创建 canvas 绘图上下文（指定 canvasId）
    this.ctx = wx.createCanvasContext(this.canvasId, this);
    this.touchFlag = false;
    this.lastPoint = [];
    // 绘制解锁点圆
    this.createCircle();
    // canvas绑定事件
    this.bindEvent();
  }
  makeState() {
    if (this.pswObj.step == 2) {
      this.page.setData({
        title: '请解锁'
      });
    } else if (this.pswObj.step == 1) {
      // pass
    } else {
      // pass
    }
  }
  // 创建解锁点的坐标，根据canvas的大小（默认300px）来平均分配半径
  createCircle() {
    var n = this.chooseType;
    var count = 0;
    var cd = 2;//解锁点之间的距离（单位为点半径）
    var xd = 1;//(解锁点到图区边的距离-解锁点之间的距离/2)
    // 计算圆半径
    this.r = this.width / (2 * xd + (2 + cd) * n);
    this.arr = [];//解锁点集合
    this.restPoint = [];
    var r = this.r;
    // 获取圆心坐标，以及当前圆所代表的数
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        count++;
        var obj = {
          x: j * (2 + cd) * r + (xd + (cd / 2) + 1) * r,
          y: i * (2 + cd) * r + (xd + (cd / 2) + 1) * r,
          index: count
        };
        this.arr.push(obj);
        this.restPoint.push(obj);
      }
    }
    // 清空画布
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 绘制所有的圆
    this.arr.forEach(current => {
      this.drawCle(current.x, current.y);
    });
  }

  // 画圆方法
  drawCle(x, y) {
    // 设置边框颜色。
    this.ctx.setStrokeStyle(this.cleColor); // 注意用set
    // 设置线条的宽度。
    this.ctx.setLineWidth(2); // 注意用set
    // 开始创建一个路径，需要调用fill或者stroke才会使用路径进行填充或描边。
    this.ctx.beginPath();
    // 画一条弧线。
    this.ctx.arc(x, y, this.r, 0, Math.PI * 2, true);
    // 闭合路径之后，图形绘制命令又重新指向到上下文中
    this.ctx.closePath();
    // 通过线条来绘制图形轮廓。默认颜色色为黑色。
    this.ctx.stroke();
    // 将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。
    this.ctx.draw(true);//true 保留画布内容并继续绘制
  }

  // 计算两点之间的距离的方法
  getDis(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  }
  
  bindEvent() {
    var self = this;
    this.page.onTouchStart = function(e) {
      var po = self.getPosition(e); //获取触摸其实点坐标
      self.lastPoint = [];
      for (var i = 0; i < self.arr.length; i++) {
        //判断起始点是否在存储坐标
        if (Math.abs(po.x - self.arr[i].x) < self.r && Math.abs(po.y - self.arr[i].y) < self.r) {
          self.touchFlag = true;
          self.drawPoint(self.arr[i].x, self.arr[i].y);
          self.lastPoint.push(self.arr[i]);
          self.restPoint.splice(i, 1);
          break;
        }
      }
    }

    this.page.onTouchMove = function(e) {
      if (self.touchFlag) {
        self.update(self.getPosition(e));
      } else if(!self.startedCircle){
        var po = self.getPosition(e); //获取触摸其实点坐标
        self.lastPoint = [];
        for (var i = 0; i < self.arr.length; i++) {
          //判断起始点是否在存储坐标
          if (Math.abs(po.x - self.arr[i].x) < self.r && Math.abs(po.y - self.arr[i].y) < self.r) {
            self.touchFlag = true;
            self.drawPoint(self.arr[i].x, self.arr[i].y);
            self.lastPoint.push(self.arr[i]);
            self.restPoint.splice(i, 1);
            break;
          }
        }
      }

    }

    this.page.onTouchEnd = function(e) {
      if (self.touchFlag) {
        self.touchFlag = false;
        self.storePass(self.lastPoint);
        setTimeout(function() {
          self.reset();
        }, 300);
      }
    }
  }
  /**
   * 获取点坐标
   */
  getPosition(e) { // 获取touch点相对于canvas的坐标
    var po = {
      x: e.touches[0].x,
      y: e.touches[0].y
    };
    return po;
  }
  drawPoint(obj) { // 初始化圆心
    for (var i = 0; i < this.lastPoint.length; i++) {
      this.ctx.setFillStyle(this.cleCenterColor); // 注意用set方法
      this.ctx.beginPath();
      this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r / 2, 0, Math.PI * 2, true);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.draw(true);
    }
  }
  /**
   * 刷新解锁轨迹
   */
  update(po) { // 核心变换方法在touchmove时候调用
    this.ctx.clearRect(0, 0, this.width, this.height);
    //绘制所有解锁点
    for (var i = 0; i < this.arr.length; i++) { // 每帧先把面板画出来
      this.drawCle(this.arr[i].x, this.arr[i].y);
    }
    // console.log("update+" + JSON.stringify(this.lastPoint))
    this.drawPoint(this.lastPoint);
    this.drawLine(po, this.lastPoint);
    
    //判断触摸点在某个解锁点内
    for (var i = 0; i < this.restPoint.length; i++) {
      var pt = this.restPoint[i];
      if (Math.abs(po.x - pt.x) < this.r && Math.abs(po.y - pt.y) < this.r) {
        this.drawPoint(pt.x, pt.y);
        this.pickPoints(this.lastPoint[this.lastPoint.length - 1], pt);
        break;
      }
    }
  }

  /**
   * 绘制折线
   */
  drawLine(po) { // 解锁轨迹
    this.ctx.beginPath();
    this.ctx.lineWidth = 3;
    this.ctx.moveTo(this.lastPoint[0].x, this.lastPoint[0].y);

    for (var i = 1; i < this.lastPoint.length; i++) {
      this.ctx.lineTo(this.lastPoint[i].x, this.lastPoint[i].y);
    }
    this.ctx.lineTo(po.x, po.y);
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.draw(true);
  }

  pickPoints(fromPt, toPt) {
    // console.log("pickPoints=" + JSON.stringify(fromPt) + "   " + JSON.stringify(toPt))
    var lineLength = this.getDis(fromPt, toPt);//两点之间的距离
    var dir = toPt.index > fromPt.index ? 1 : -1;
    var len = this.restPoint.length;
    var i = dir === 1 ? 0 : (len - 1);
    var limit = dir === 1 ? len : -1;
    // console.log("pickPoints: lineLength=" + lineLength + "  dir=" + dir 
    // + "  len=" + len + "  i=" + i +"  limit="+limit)
    while (i !== limit) {
      var pt = this.restPoint[i];
      if (this.getDis(pt, fromPt) + this.getDis(pt, toPt) === lineLength) {
        this.drawPoint(pt.x, pt.y);
        this.lastPoint.push(pt);
        this.restPoint.splice(i, 1);//删除i开始的1个元素
        if (limit > 0) {
          i--;
          limit--;
        }
      }
      i += dir;
    }
  }
  /**
   * touchend结束之后对密码和状态的处理
   */
  storePass(psw) { // touchend结束之后对密码和状态的处理
    if (this.pswObj.step == 1) {
      if (this.checkPass(this.pswObj.fpassword, psw)) {
        this.pswObj.step = 2;
        this.pswObj.spassword = psw;
        this.page.setData({
          title: '密码保存成功'
        });
        this.drawStatusPoint('#2CFF26');
        wx.setStorageSync('passwordxx', JSON.stringify(this.pswObj.spassword));
        wx.setStorageSync('chooseType', this.chooseType);
      } else {
        this.page.setData({
          title: '两次不一致，重新输入'
        });
        this.drawStatusPoint('red');
        delete this.pswObj.step;
      }
    } else if (this.pswObj.step == 2) {
      if (this.checkPass(this.pswObj.spassword, psw)) {
        this.page.setData({
          title: '解锁成功'
        });
        this.drawStatusPoint('#2CFF26');
      } else {
        this.drawStatusPoint('red');
        this.page.setData({
          title: '解锁失败'
        });
      }
    } else {
      this.pswObj.step = 1;
      this.pswObj.fpassword = psw;
      this.page.setData({
        title: '再次输入'
      });
    }
  }

  drawStatusPoint(type) { // 初始化状态线条
    for (var i = 0; i < this.lastPoint.length; i++) {
      this.ctx.strokeStyle = type;
      this.ctx.beginPath();
      this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r, 0, Math.PI * 2, true);
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.draw(true);
    }
  }

  /**
   * 校验点集合
   */
  checkPass(psw1, psw2) { // 检测密码
    var p1 = '',
      p2 = '';
    for (var i = 0; i < psw1.length; i++) {
      p1 += psw1[i].index ;
    }
    for (var i = 0; i < psw2.length; i++) {
      p2 += psw2[i].index ;
    }
    // console.log("checkPass:" + JSON.stringify(psw1) + "  " + JSON.stringify(psw2)+"  "+p1+"  "+p2)
    return p1 === p2;
  }

  /**
   * 重置解锁密码
   */
  updatePassword() {
    wx.removeStorageSync('passwordxx');
    wx.removeStorageSync('chooseType');
    this.pswObj = {};
    this.page.setData({
      title: '绘制解锁图案'
    });
    this.reset();
  }

  reset() {
    this.makeState();
    this.createCircle();
  }
}
module.exports = Locker;