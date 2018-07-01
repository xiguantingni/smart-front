// pages/contact/contactdetail/contactdetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    name: '',
    remark: '',
    phone: '',
    isEdit: false
  },

  editClick: function(e) {
    this.setData({
      isEdit: true
    })
  },

  deleteContact: function(e) {
    var me = this;
    wx.showModal({
      title: '提示',
      content: `确认要删除${me.data.name}吗？`,
      success: function (res) {
        if (res.confirm) {
          // 开始删除
          wx.showLoading({
            title: '删除中...',
          });
          wx.request({
            url: `${app.globalData.baseURL}/deleteContact/`,
            data: {
              id: me.data.id,
              openid: app.globalData.openid
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


        } else if (res.cancel) {
          // 回到当前页面，不做处理
        }
      }
    })
  },

  editContact: function (e) {
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
      url: `${app.globalData.baseURL}/editContact/`,
      data: {
        id: this.data.id,
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

  bindName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  bindRemark: function (e) {
    this.setData({
      remark: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      id: app.globalData.temp.id,
      name: app.globalData.temp.name,
      remark: app.globalData.temp.remark,
      phone: app.globalData.temp.phone
    });
  }
})