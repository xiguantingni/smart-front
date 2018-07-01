// pages/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: `${app.globalData.baseURL}/login/`,
            data: {
              code: res.code
            },
            success: function (res) {
              // 登录成功，则跳转主页面
              if (res.data && res.data.code === '0') {
                app.globalData.openid = res.data.openid;
                app.globalData.trip = res.data.data.trip;
                app.globalData.contact = res.data.data.contact;
                app.globalData.orderrecord = res.data.data.orderrecord;
                app.globalData.message = res.data.data.message;
                app.globalData.phone = res.data.data.phone;
                app.globalData.account = res.data.data.account;
                app.globalData.advice = res.data.data.advice;
                wx.redirectTo({
                  url: '../index/index'
                })
              }
            }
          })
        }
      },
      fail: function () {
        console.log('')
      }
    })
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