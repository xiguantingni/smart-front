//获取应用实例
const app = getApp()

Page({
  data: {
    id: '',
    destination: '',
    remark: '',
    taskDetail: []
  },
  contactclick: function(e) {
    wx.setStorage({
      key: 'trip2contact',
      data: e.currentTarget.dataset.tripcontact
    })
    wx.navigateTo({
      url: '../tripcontact/tripcontact',
    })
  },
  addTask: function(e) {
    console.log(this.data.id)
    app.globalData.temp = {
      tripid: this.data.id,
      destination: this.data.destination
    };
    wx.navigateTo({
      url: '../addtask/addtask',
    })
  },
  onShow: function() {
    var me = this;
    var tripid = this.data.id || app.globalData.temp;
    var trip = app.globalData.trip;
    trip.forEach(function(item) {
      if (item.id === tripid) {
        me.setData({
          id: item.id,
          destination: item.destination,
          remark: item.remark,
          taskDetail: item.taskDetail
        });
        return false;
      }
    });
  }
})
