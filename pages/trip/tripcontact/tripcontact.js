//获取应用实例
const app = getApp()

Page({
  data: {
    name: '',
    remark: '',
    task: [],
    isSend: false,
    mode: 'post', // post, f2f
    codeInput: 'scan', // scan, hand
    code: '',
    isMessaged: false
  },
  changeIsSend: function() {
    this.setData({
      isSend: true
    })
  },
  changeTransMode: function(e) {
    this.setData({
      mode: e.detail.value
    })
  },
  codeChange: function(e) {
    this.setData({
      code: e.detail.value
    })
  },
  changeCodeInput: function(e) {
    this.setData({
      codeInput: e.detail.value
    })
  },
  messageNotify: function() {
    if (!this.data.code) {
      wx.showToast({
        title: `请输入快递单号`,
        icon: 'none'
      });
      return;
    }
    this.setData({
      isMessaged: true
    })
  },
  getScanCode: function() {
    var me = this;
    wx.scanCode({
      onlyFromCamera: true,
      success: function(res) {
        me.setData({
          code: res.result
        })
      },
      fail: function(res) {
        me.setData({
          code: ''
        })
      }
    })
  },
  onReady: function () {
    // 模拟环境，暂且定义
    var me = this;
    wx.getStorage({
      key: 'trip2contact',
      success: function (res) {
        console.log(res);
        me.setData({
          name: res.data.name,
          remark: res.data.remark,
          task: res.data.task
        })
      }
    })
  }
})
