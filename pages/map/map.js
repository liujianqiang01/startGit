var app = getApp();
Page({
  data: {
    url: "https://nice.yuxwl.top/resource",
    //url:"http://127.0.0.1:8080",
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
    //设置初始定位
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
  getMarkers(data) {
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
      iconPath:  point.placeIconPath,
      label: {
        x: -24,
        y: -26,
        content: point.placeName
      },
      width: 30,
      height: 30,
      callout: {      
        content: point.placeContent,
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
  sendMsg(){
   wx.navigateTo({
     url: '../publishmsg/publishmsg'
   })
  },
  chatTools(){
    wx.navigateTo({
      url: '../chatTools/chatTools'
    })
  },
  //点击标记点时触发
   markertap(){
    console.log("click me");
  }
  
})

// 定时刷新页面标记点
function countdown(that) {
 var timer = setTimeout(function () {
   getReq(that)
    countdown(that);
  }, 3000);
};

//获取后台坐标参数
function getReq(that){
wx.request({
  url: that.data.url+'/index', 
    data: {},
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      that.setData({
        markers: that.getMarkers(res.data)
      })
    }
})
}

function download(url){
  wx.downloadFile({
    url: url,
    type: 'image',
    success: function(res) {
      console.log(res.tempFilePath);
      return res.tempFilePath;
    },
    fail: function(res) {},
    complete: function(res) {},
  })
}