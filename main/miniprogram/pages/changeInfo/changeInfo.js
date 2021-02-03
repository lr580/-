// pages/changeInfo/changeInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{ },
    area: '无',
    zhuanye:'无',
    year:'无',
    school:'无'
  },
/*获取昵称头像，无作用*/
  onLoad: function (options) {
    this.setData({
        userinfo: wx.getStorageSync('userInfo')
      })
  },
  choseImage:function(){
    this.openAlert('头像暂不支持修改')
  },

  openAlert:function(e){
    wx.showToast({
      title: e,
      icon:"none"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */


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