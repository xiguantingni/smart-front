// pages/me/advice/advice.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    advice: ''
  },

  bindAdvice: function(e) {
    this.setData({
      advice: e.detail.value
    })
  },

  sendAdvice: function() {
    var me = this;
    if (!this.data.advice) {
      wx.showToast({
        title: `您还未填写任何建议和意见`,
        icon: 'none'
      });
      return;
    }
    wx.showLoading({
      title: '发送中...',
    });
    wx.request({
      url: `${app.globalData.baseURL}/sendadvice/`,
      data: {
        openid: app.globalData.openid,
        advice: me.data.advice
      },
      method: 'POST',
      success: function (res) {
        app.globalData.advice = res.data.advice;
        wx.navigateBack();
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  }

})