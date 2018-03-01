var plongitude;
var platitude;
var nickName;
var avatarUrl;
Page({
  data: {
    tip: '',
    tatil: '',
    detail: '',
    url: "https://nice.yuxwl.top/resource"
  },
  submit: function (e) {
    if (e.detail.value.tatil.length == 0) {
      this.setData({
        tip: '提示：标题不能为空！',
      })
    } else {
      var that = this; 
      UserInfo();
      sendMsg(that);
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
function UserInfo() {
  wx.getUserInfo({
    success: res => {
      nickName = res.userInfo.nickName;
      avatarUrl = res.userInfo.avatarUrl;
    }
  })};

  //发布消息
  function sendMsg(that){
    getLocation();
    wx.request({
      url: that.data.url + '/publishMsg',
      data: {
        content: "cesjo",
        longitude: plongitude,
        latitude: platitude,
        nickName: nickName,
        avatarUrl: avatarUrl
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
      }
    })
  }
  //获取本地经纬度
  function getLocation() {
    wx.getLocation({
      type: '',
      altitude: true,
      success: function (res) {
        plongitude = res.longitude,
          platitude = res.latitude
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }