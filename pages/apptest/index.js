// pages/apptest/index.js
var app = getApp()
/**
 * 船桨数据对象
 */
function _creatRowingPaddleSensor() {
  var obj = new Object()
  obj._DrawstringSLen = 0.061; //拉带单位长度
  obj._DataReady = 0; // 数据准备好，=0 没有准备好，=1 数据准备好
  obj._DeviceSta = 0; //   设备状态，=0：拉杠静止，=1 正在拉
  obj._PulseCnt = 0; //   脉冲个数计数
  obj._RowingAmp = 0; //   桨幅值，单位：米
  obj._RowingFrq = 0; // 桨频值
  obj._StopCnt = 0; //   记满两次为零时，认为设备没有在拉
  obj._TimeCnt = 0; // 桨频计算使用的计数
  obj._TotalCnt = 0; // 总桨数     
  return obj
}
/**
 * 船桨数据工具类
 */
function _RowingAlgorithmUtils(ASensordata, RowingAsensorPata) {
  var rtn = false;
  RowingAsensorPata._TimeCnt++; //桨频计算用计数
  if (RowingAsensorPata._TimeCnt > 1000) {
    RowingAsensorPata._TimeCnt = 1000;
  }
  if (ASensordata > 0) {
    RowingAsensorPata._StopCnt = 0;
    RowingAsensorPata._PulseCnt += ASensordata;
    if (RowingAsensorPata._DeviceSta == 0) //如果之前设备处理静止状态
    {
      RowingAsensorPata._DeviceSta = 1; //状态设置为正在拉动
    }
  } else //如果为0
  {
    if (RowingAsensorPata._DeviceSta == 1) //如果之前设备处理划桨状态
    {
      RowingAsensorPata._StopCnt++; //正在拉动，但检测到一次0，此时继续，
      if (RowingAsensorPata._StopCnt >= 2) // 检测到两次，认为确实停止
      {
        RowingAsensorPata._RowingAmp = RowingAsensorPata._PulseCnt * RowingAsensorPata._DrawstringSLen;
        if (RowingAsensorPata._PulseCnt > 4) //只有>5才认为是拉到
        {
          RowingAsensorPata._RowingFrq = 60 / (RowingAsensorPata._TimeCnt * 0.2);
          RowingAsensorPata._TimeCnt = 0;
          RowingAsensorPata._DataReady = 1;
          RowingAsensorPata._TotalCnt += 1;
          rtn = true; //认定一次划桨的条件：脉冲记数大于5，从划桨状态下连续读到两次0脉冲
        }
        RowingAsensorPata._PulseCnt = 0;
        RowingAsensorPata._StopCnt = 0;
        RowingAsensorPata._DeviceSta = 0;
      }
    } else {
      RowingAsensorPata._DataReady = 0;
      RowingAsensorPata._PulseCnt = 0;
    }
  }
  return rtn;
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      date: app.globalData.data
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

    var ob = _creatRowingPaddleSensor()
    console.log("Hello World!" + JSON.stringify(ob));
    for (var i = 0; i < 1; i++) {
      var v = _RowingAlgorithmUtils(0, ob)
      if (v) {
        console.log("Hello World!" + JSON.stringify(ob));
      } else {
        console.log("Hello World!" + false);
      }

    }
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
  setAppData: function() {
    app.setGlobalData(new Date())
    console.log(app.globalData.data)

    console.log(this.data.date)
  }
})