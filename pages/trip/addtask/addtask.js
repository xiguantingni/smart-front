// pages/trip/addtask/addtask.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tripid: '',
    destination: '',
    contactName: '',
    remark: '',
    task: []
  },

  bindContact: function(e) {
    this.setData({
      contactName: e.detail.value
    })
  },

  bindRemark: function (e) {
    this.setData({
      remark: e.detail.value
    })
  },

  addGood: function() {
    var task = this.data.task;
    task.push({
      name: '',
      number: '',
      inPrice: '',
      outPrice: ''
    })
    this.setData({
      task: task
    })
  },

  bindName: function(e) {
    var index = e.target.dataset.index;
    var task = this.data.task;
    task[index].name = e.detail.value;
    this.setData({
      task: task
    })
  },

  bindNumber: function (e) {
    var index = e.target.dataset.index;
    var task = this.data.task;
    task[index].number = e.detail.value;
    this.setData({
      task: task
    })
  },

  bindInPrice: function (e) {
    var index = e.target.dataset.index;
    var task = this.data.task;
    task[index].inPrice = e.detail.value;
    this.setData({
      task: task
    })
  },

  bindOutPrice: function (e) {
    var index = e.target.dataset.index;
    var task = this.data.task;
    task[index].outPrice = e.detail.value;
    this.setData({
      task: task
    })
  },

  confirmAddGood: function() {
    console.log(this.data);
    // 参数检查
    var isPassed = true;
    if (!this.data.contactName) {
      wx.showToast({
        title: '请填写联系人',
        icon: 'none'
      });
      isPassed = false;
      return;
    }
    this.data.task.forEach(function(item, index) {
      if (!item.name) {
        wx.showToast({
          title: `请填写第${index + 1}组的商品名称`,
          icon: 'none'
        });
        isPassed = false;
        return false;
      }
      if (item.number === '') {
        wx.showToast({
          title: `请填写第${index + 1}组的数量`,
          icon: 'none'
        });
        isPassed = false;
        return false;
      }
      if (isNaN(item.number)) {
        wx.showToast({
          title: `第${index + 1}组的数量必须为数字`,
          icon: 'none'
        });
        isPassed = false;
        return false;
      }
      if (item.inPrice === '') {
        wx.showToast({
          title: `请填写第${index + 1}组的单进价`,
          icon: 'none'
        });
        isPassed = false;
        return false;
      }
      if (isNaN(item.inPrice)) {
        wx.showToast({
          title: `第${index + 1}组的单进价必须为数字`,
          icon: 'none'
        });
        isPassed = false;
        return false;
      }
      if (item.outPrice === '') {
        wx.showToast({
          title: `请填写第${index + 1}组的单售价`,
          icon: 'none'
        });
        isPassed = false;
        return false;
      }
      if (isNaN(item.outPrice)) {
        wx.showToast({
          title: `第${index + 1}组的单售价必须为数字`,
          icon: 'none'
        });
        isPassed = false;
        return false;
      }
    });
    if (!isPassed) {
      return;
    }
    // 检查通过，开始提交
    wx.showLoading({
      title: '提交中...',
    });
    wx.request({
      url: `${app.globalData.baseURL}/addTask/`,
      data: {
        contactName: this.data.contactName,
        remark: this.data.remark,
        openid: app.globalData.openid,
        tripid: this.data.tripid,
        task: this.data.task
      },
      method: 'POST',
      success: function (res) {
        app.globalData.trip = res.data.trip;
        wx.navigateBack();
      },
      complete: function() {
        wx.hideLoading();
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      tripid: app.globalData.temp.tripid,
      destination: app.globalData.temp.destination
    });
  }
})