var app = getApp()

Page({
  data: {
    motto: 'Fluid infusion without worry ',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    
  },


  //事件处理函数
  gotodetail: function () {
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  gotodetail2: function () {
    const requestTask = wx.request({
      url: 'https://api.heclouds.com/devices/505037062/datapoints?datastream_id=level1,kaiguan1,level2,kaiguan2&limit=1',
      header: {
        'content-type': 'application/json',
        'api-key': 'Pc2e=yLk3ZtJfnet1oyEmMhv9AU= '
      },//产品ak

      success: function (res) {
        //console.log(res.data)
        //拿到数据后保存到全局数据
       var level=[];
       var kaiguan=[];
       var i=1;
        var app = getApp()
        kaiguan[1] = res.data.data.datastreams[0].datapoints[0].value;
        level[1] = res.data.data.datastreams[1].datapoints[0].value;
       kaiguan[2] = res.data.data.datastreams[2].datapoints[0].value;
        level[2] = res.data.data.datastreams[3].datapoints[0].value;
        console.log(level[1]);
        console.log(level[2]);
        console.log(kaiguan[1]);
        console.log(kaiguan[2]);
        data: {
          items: [
            { reply: "" }
          ]
        }
        var reply = "";
        var i = 1;

        var n = 0;
        for (var i = 1; i <= 2; i++) {
          if (kaiguan[i] <= 300 && level[i] == "0.00") {

            var that = this
            reply = reply + i + "号病人即将输液完毕\r\n"
            n++;
          }
        }
        if (n == 0) {
          var that = this
          reply = "没有病人即将输液完"
        }
        var that = this
        wx.showModal
          ({
            title: '温馨提示',
            content: reply,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
              else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
      },






      fail: function (res) {
        console.log("fail!!!")
      },
      complete: function (res) {
        console.log("end")
      }
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
})