// pages/lock/lock.js
var Locker = require('./h5lock.js');
Page({
  data: {
    title: '请绘制您的图形密码'
  },
  onReady(){
    // var ctx = wx.createCanvasContext('canvas');
    this.lock = new Locker(this,{
      id: 'canvas',
      cleColor:'rgba(0,136,204,1)',//线颜色
      cleCenterColor:'rgba(0,136,204,1)',//点颜色
      chooseType: 3,//每行（列）点数
      startedCircle:false//其实点是否必须在解锁点上
    });
  },
  resetPwd() {
    this.lock.updatePassword();
  }
})