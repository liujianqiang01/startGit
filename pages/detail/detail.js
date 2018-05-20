// pages/detail/detail.js
var that;
var markerId
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    url: "https://nice.yuxwl.top/resource",
    //url:"http://127.0.0.1:8080",
    markers: "",
    _input : "",
    markerId:"",
    hidden: true,
    addHidden:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    markerId = options.markeId;
    that = this;
    wx.request({
      method: 'GET',
      url: this.data.url + '/queryAllByMarkerId',
      data: { markerId: options.markeId},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {  
        console.log(res.data)
        that.setData({
          markers: res.data
        })
      }
    }),
    wx.getUserInfo({
      success: res => { 
       if(res.userInfo.nickName == that.data.markers.placeName){
         that.setData({
           addHidden: false
         })
       }
      }})
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
  
  },

  addDatile:function(){
    that.setData({
      hidden: false
    });
  },
  bindinput: function (e) {
    that.setData({
      _input: e.detail.value
    }); 
    
  },

  confirm: function (e) {
    console.log(that.data)
    wx.getUserInfo({
      success: res => { 
        wx.showLoading({
          mask: true,
          title: '努力加载中...',
        });
        wx.request({
          url: that.data.url + '/addDetail',
          data: { "detail": that.data._input, 
                  "markerId": markerId,     
                  "nickName":res.userInfo.nickName,
                  "userName": that.data.markers.placeName
                 },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            wx.hideLoading();
            that.setData({
              hidden: true
            });
          }
        }) 

      }
    })


    
  },
})
 