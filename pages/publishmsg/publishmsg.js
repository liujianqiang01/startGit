var plongitude;
var platitude;
var nickName;
var avatarUrl;
var detail;
var tatil;
Page({
  data: {
    tip: '',
    tatil: '',
    detail: '',
    url: "https://nice.yuxwl.top/resource"
    //url:"http://127.0.0.1:8080/",
  },
  submit: function (e) {
    if (e.detail.value.tatil.length == 0) {
      this.setData({
        tip: '提示：标题不能为空！',
      })
    } else {
      console.log(e.detail.value.detail)
     detail = e.detail.value.detail;
     tatil = e.detail.value.tatil;
      var that = this; 
      UserInfo(that);
      
    }
  },
  Reset: function () {
    this.setData({
      tip: '',
      tatil: '',
      detail: ''
    })
  }
})
 //获取用户信息
function UserInfo(that) {
  wx.getUserInfo({
    success: res => {
      nickName = res.userInfo.nickName;
      avatarUrl = res.userInfo.avatarUrl;
      getLocation(that);
     
    }
  })};

  //获取本地经纬度
  function getLocation(that) {
    wx.getLocation({
      type: '',
      altitude: true,
      success: function (res) {
        plongitude = res.longitude,
          platitude = res.latitude
        sendMsg(that);
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }

  //发布消息
  function sendMsg(that) {
    wx.request({
      url: that.data.url + '/publishMsg',
      data: {
        content: detail,
        longitude: plongitude,
        latitude: platitude,
        nickName: nickName,
        avatarUrl: avatarUrl,
        tatil: tatil
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.navigateTo({
          url: '../map/map'
        })
      }
    })
  }