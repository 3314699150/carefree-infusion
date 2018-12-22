// pages/detail/detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh', new Date())
  },
  data: {
    condition: []
   
    
  },  
  onLoad: function () {
    //从oneNET请求数据
    var that = this;
    const requestTask = wx.request({
      url: 'https://api.heclouds.com/devices/505037062/datapoints?datastream_id=level1,kaiguan1,level2,kaiguan2,level3,kaiguan3&limit=1',
      header: {
        'content-type': 'application/json',
        'api-key': 'Pc2e=yLk3ZtJfnet1oyEmMhv9AU= '
      },//产品ak

      success: function (res) {
        //console.log(res.data)
        //拿到数据后保存到全局数据
        var level = [];
        var kaiguan = [];
        var i = 1;
        var condition=that.data.condition;
        console.log(condition);


        var app = getApp()

        level[1] = res.data.data.datastreams[1].datapoints[0].value;
        kaiguan[1]= res.data.data.datastreams[0].datapoints[0].value;
        level[2] = res.data.data.datastreams[5].datapoints[0].value;
        kaiguan[2] = res.data.data.datastreams[3].datapoints[0].value;
        level[3] = res.data.data.datastreams[4].datapoints[0].value;
        kaiguan[3] = res.data.data.datastreams[2].datapoints[0].value;
        console.log(level[1]);
        console.log(kaiguan[1]);
        console.log(level[2]);
        console.log(kaiguan[2]); 
        console.log(level[3]);
        console.log(kaiguan[3]);
        
        
       

        for (var i = 1; i <= 3; i++) {
          if (kaiguan[i] > 300) {
          condition[i] = "该吊瓶未使用";
            console.log(condition[i]);
          }
          else if (kaiguan[i] <= 300) {
            if (level[i] == "0.00") { condition[i] = "即将输完"; }
            else if (level[i] == "1.00") { condition[i] = "正在输液"; }
          }
        }
             that.setData({
               'condition':condition
             })
         

             console.log(condition)







        
        
       // that.setData({
          //hidden: false,
         // condition1: condition1,
         // condition2: condition2,
          //condition3: condition3,
        //})
      },


      fail: function (res) {
        console.log("fail!!!")
      },

      complete: function (res) {
        console.log("end")
      }
    })
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

  },
  
})