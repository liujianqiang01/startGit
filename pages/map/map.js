var app = getApp();

Page({
  data: {
    url: "",
    scale: '15',
    Height: '0',
    controls: '40',
    latitude: '',
    longitude: '',
    markers: [],
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('myMap');
  
  },
  onLoad: function () {
    var that = this;

 //   that.setData({
   //   url: app.globalData.url
    //})
    countdown(that);
    var data = JSON.stringify({
      page: 1,
      pageSize: 10,
      request: {
        placeLongitude: app.globalData.longitude,
        placeLatitude: app.globalData.latitude,
        userId: app.globalData.userId
      }
    })
    wx.getLocation({
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
        that.setData({
          scale: 12,
          longitude: res.longitude,
          latitude: res.latitude,
        })
      }
    });
    wx.getSystemInfo({
      success: function (res) {
        //设置map高度，根据当前设备宽高满屏显示
        that.setData({
          view: {
            Height: res.windowHeight
          },

        })
      }
    })
  },
  controltap(e) {
    this.moveToLocation()
  },
  getSchoolMarkers(data) {

    var market = [];

    for (let item of data) {

      let marker1 = this.createMarker(item);

      market.push(marker1)
    }
    return market;
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  strSub: function (a) {
    var str = a.split(".")[1];
    str = str.substring(0, str.length - 1)
    return a.split(".")[0] + '.' + str;
  },
  createMarker(point) {

    let latitude = this.strSub(point.placeLatitude);
    let longitude = point.placeLongitude;
    let marker = {
      id: point.id || 0,
      name: point.placeName || '',
      title: point.placeName || '',
      latitude: latitude,
      longitude: longitude,
      label: {
        x: -24,
        y: -26,
        content: point.placeName
      },
      width: 30,
      height: 30,
      callout: {      
        content: point.placecontent,
        color: "#F8F8FF",
        fontSize: "12",
        borderRadius: "10",
        bgColor: "#008B8B",
        padding: "10",
        display: "ALWAYS"   
      }
    };
    return marker;
  },
  //发布消息
   sendMsg(){
     getLocation();
     wx.request({
       url: 'https://nice.yuxwl.top/resource/publishMsg',
       data: {
        content:"cesjo",
        longitude:plongitude,
        latitude:platitude
       },
       header: {
         'content-type': 'application/json' // 默认值
       },
       success: function (res) {
       }
     })
  }
}

)
// 定时任务
function countdown(that) {
 var timer = setTimeout(function () {
   getReq(that)
  //  countdown(that);
  }, 1000);
};

//获取后台参数
function getReq(that){
wx.request({
  url: 'https://nice.yuxwl.top/resource/index', 
    data: {},
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      that.setData({
        markers: that.getSchoolMarkers(res.data)
      })
    }
})
}
//获取本地经纬度
var plongitude;
var platitude;
function getLocation(){
  wx.getLocation({
  type: '',
  altitude: true,
  success: function(res) {
    plongitude= res.longitude,
    platitude= res.latitude
  },
  fail: function(res) {},
  complete: function(res) {},
})
}