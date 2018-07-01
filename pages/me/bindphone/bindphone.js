// pages/me/bindphone/bindphone.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: ''
  },

  bindphone: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  bindphoneclick: function(e) {
    var me = this;
    if (!this.data.phone) {
      wx.showToast({
        title: `请填写手机号码`,
        icon: 'none'
      });
      return;
    }
    wx.showLoading({
      title: '提交中...',
    });
    wx.request({
      url: `${app.globalData.baseURL}/bindphone/`,
      data: {
        openid: app.globalData.openid,
        phone: me.data.phone
      },
      method: 'POST',
      success: function (res) {
        app.globalData.phone = res.data.phone;
        wx.navigateBack();
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  }
})