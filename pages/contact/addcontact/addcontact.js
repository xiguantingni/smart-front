// pages/contact/addcontact/addcontact.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    phone: '',
    remark: ''
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  addContact: function(e) {
    // 参数检查
    if (!this.data.name) {
      wx.showToast({
        title: '姓名是必填项',
        icon: 'none'
      });
      return;
    }
    wx.showLoading({
      title: '提交中...',
    });
    // 开始提交
    wx.request({
      url: `${app.globalData.baseURL}/addContact/`,
      data: {
        id: new Date().getTime(),
        name: this.data.name,
        remark: this.data.remark,
        openid: app.globalData.openid,
        phone: this.data.phone
      },
      method: 'POST',
      success: function (res) {
        app.globalData.contact = res.data.contact;
        wx.navigateBack();
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },

  bindName: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindPhone: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  bindRemark: function (e) {
    this.setData({
      remark: e.detail.value
    })
  }
})