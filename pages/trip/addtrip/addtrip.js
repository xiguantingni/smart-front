// pages/trip/addtrip/addtrip.js
const app = getApp()
const util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    destination: '',
    remark: ''
  },

  bindDestination: function(e) {
    this.setData({
      destination: e.detail.value
    })
  },

  bindRemark: function(e) {
    this.setData({
      remark: e.detail.value
    })
  },

  addTrip: function(e) {
    if (!this.data.destination) {
      return ;
    }
    wx.request({
      url: `${app.globalData.baseURL}/addTrip/`,
      data: {
        destination: this.data.destination,
        remark: this.data.remark,
        openid: app.globalData.openid,
        id: new Date().getTime(),
        date: util.formatDate(new Date, 'YYYY-MM-DD')
      },
      method: 'POST',
      success: function(res) {
        app.globalData.trip = res.data.trip;
        wx.navigateBack();
      },
      fail: function(err) {
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

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