// pages/message/sendmessage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    name: '',
    phone: ''
  },

  bindName: function(e) {
    this.setData({
      name: e.detail.value
    })
  },

  bindPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  bindContent: function(e) {
    this.setData({
      content: e.detail.value
    })
  },

  sendClick: function() {
    var me = this;
    // 短信内容检查
    if (!this.data.content) {
      wx.showToast({
        title: `短信内容不能为空`,
        icon: 'none'
      });
    }
    wx.showLoading({
      title: '提交中...',
    });
    wx.request({
      url: `${app.globalData.baseURL}/sendMessage/`,
      data: {
        openid: app.globalData.openid,
        name: me.data.name,
        phone: me.data.phone,
        content: me.data.content
      },
      method: 'POST',
      success: function (res) {
        wx.showToast({
          title: `发送成功`,
          icon: 'none'
        });
        app.globalData.message = res.data.message;
        wx.navigateBack();
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  }
})