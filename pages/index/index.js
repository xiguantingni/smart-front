//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    currentPage: 'trip', // 目前预设4个页面，分别为：trip, contact, order, ,message, me.
    trip: [],
    contact: [],
    orderrecord: [],
    message: [],
    courierNumber: '',
    courierInfo: null
  },
  tripClick: function(e) {
    app.globalData.temp = e.currentTarget.dataset.tripid;
    wx.navigateTo({
      url: '../trip/tripdetail/tripdetail',
    })
  },
  contactClick: function (e) {
    app.globalData.temp = e.currentTarget.dataset.contactinfo;
    wx.navigateTo({
      url: '../contact/contactdetail/contactdetail',
    })
  },
  sendMessage: function(e) {
    wx.navigateTo({
      url: '../message/sendmessage/sendmessage',
    })
  },
  onShow: function() {
    // 此处展示所有行程
    this.setData({
      trip: app.globalData.trip,
      contact: app.globalData.contact,
      orderrecord: app.globalData.orderrecord,
      message: app.globalData.message,
      phone: app.globalData.phone || "",
      advice: app.globalData.advice,
      account: app.globalData.account
    });
  },
  changePage: function(e) {
    this.setData({
      currentPage: e.target.dataset.page
    })
  },
  bindCourierNumber: function(e) {
    if (!e.detail.value) {
      this.setData({
        courierNumber: e.detail.value,
        courierInfo: null
      })
    } else {
      this.setData({
        courierNumber: e.detail.value
      })
    }
  },
  courierNumberClick: function(e) {
    var me = this;
    // 查询快递单号
    wx.showLoading({
      title: '查询中...',
    });
    wx.request({
      url: `${app.globalData.baseURL}/queryCourierNumber/`,
      data: {
        courierNumber: me.data.courierNumber,
        openid: app.globalData.openid
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data.courierInfo);
        // 正常输出快递信息
        if (res.data && res.data.code === '0' && res.data.courierInfo && res.data.courierInfo.error_code === 0) {
          me.setData({
            courierInfo: res.data.courierInfo.result
          })
        }
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },
  addTrip: function(e) {
    wx.navigateTo({
      url: '../trip/addtrip/addtrip',
    })
  },
  addContact: function(e) {
    wx.navigateTo({
      url: '../contact/addcontact/addcontact'
    })
  },
  bindPhoneClick: function() {
    wx.navigateTo({
      url: '../me/bindphone/bindphone'
    })
  },
  aboutmeClick: function() {
    wx.navigateTo({
      url: '../me/about/about'
    })
  },
  adviceClick: function() {
    wx.navigateTo({
      url: '../me/advice/advice'
    })
  },
  accountClick: function () {
    wx.navigateTo({
      url: '../me/account/account'
    })
  }
})
