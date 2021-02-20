// pages/collect/collect.js
const db = wx.cloud.database()
const _ = db.command
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mypost: [],
    dataArr: [],
    name: null,
    tag: null,
    tutle: null,
    unfresh: false,
  },

  getData: async function () {
    //if(this.data.unfresh) return
    var res = await db.collection("user").doc(app.globalData.userID).get().then(res => {
      this.setData({
        dataArr: res.data.publish
      })

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    if (this.data.unfresh) return //禁止重复加载
    //由于onshow的意思是当(从隐藏到显示而不是从关闭到打开)
    //其实以下内容应该放onLoad的，但上一行代码已经弥补这个故障了
    //页面必须关闭后打开才刷新，否则需要做太多if判断
    this.setData({types:['回帖'].concat(getApp().globalData.types)})
    wx.showLoading({
      title: '加载中...',
    })
    var res = await this.getData()
    var p = 0
    for (var i = 0, len = this.data.dataArr.length; i < len; i++) {
      var res = await db.collection("post").doc(String(this.data.dataArr[i])).get().then(res => {
        var type = null
        var day = res.data.activeTime.getDate()
        var year = res.data.activeTime.getFullYear()
        var month = res.data.activeTime.getMonth() + 1//月份从0开始算
        if (month < 10) { month = "0" + String(month) }
        var hour = res.data.activeTime.getHours()
        if (hour < 10) { hour = "0" + String(hour) }
        var min = res.data.activeTime.getMinutes()
        if (min < 10) { min = "0" + String(min) }
        var sec = res.data.activeTime.getSeconds()
        if (sec < 10) { sec = "0" + String(sec) }
        console.log(year + " " + month + " " + day + "  " + hour + " " + min + " " + sec)
        if (res.data.type == 1) { type = "问答" }
        else if (res.data.type == 2) { type = "交流" }
        else if (res.data.type == 3) { type = "分享" }
        else { type = "日志" }
        this.data.mypost.push({ title: res.data.title, tag: res.data.tag, activeTime: year + "/" + month + "/" + day + " " + hour + ":" + min + ":" + sec, type: res.data.type, fatherPost: res.data.fatherPost, id: res.data.id })
        if (i == len - 1) {
          wx.hideLoading(),
            this.setData({
              mypost: this.data.mypost
            })
        }
      })
    }

  },

  gotoPost: function (e) {
    var temp = this.data.mypost
    console.log('tmp', temp)
    var idx = -1
    for (let i = 0; i < temp.length; ++i) {
      if (Number(e.currentTarget.id) == temp[i].id) {
        idx = i
        break
      }
    }
    console.log(Number(e.currentTarget.id), idx)
    if (temp[idx].fatherPost) {//原理上恒为true
      wx.navigateTo({
        url: '/pages/postt/postt?id=' + String(temp[idx].fatherPost),
      })
    } else {
      wx.navigateTo({
        url: '/pages/postt/postt?id=' + String(e.currentTarget.id),
      })
    }
    this.setData({ unfresh: true })
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