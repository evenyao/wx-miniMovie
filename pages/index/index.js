const app = getApp();
var mapkey = app.globalData.mapkey


Page({
  data: {
    currentCity: '',
    currentTab: 0,
    items: [
      {
        "iconPath": "/pages/img/index2.png",
        "selectedIconPath": "/pages/img/index1.png",
        "text": "榜单"
      },
      {
        "iconPath": "/pages/img/us2.png",
        "selectedIconPath": "/pages/img/us1.png",
        "text": "北美"
      },
      {
        "iconPath": "/pages/img/hot2.png",
        "selectedIconPath": "/pages/img/hot1.png",
        "text": "热映"
      },
      {
        "iconPath": "/pages/img/find2.png",
        "selectedIconPath": "/pages/img/find1.png",
        "text": "查找"
      }
    ]
  },
  swichNav: function (e) {
    let that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  onLoad: function (options) {
    this.getLocation();
  },


  getLocation: function () {
    var page = this
    wx.getLocation({
      type: 'wgs84',   //默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标 
      success: function (res) {
        // success  
        var longitude = res.longitude
        var latitude = res.latitude
        page.loadCity(longitude, latitude)
      }
    })
  },

  loadCity: function (longitude, latitude) {
    var page = this
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=' + mapkey +'&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // success  
        console.log(res);
        var city = res.data.result.addressComponent.city;
        var _city = city.replace('市', '')  // 格式化
        getApp().globalData.currentCity = _city
        page.setData({ currentCity: _city });
        
      },
      fail: function () {
        page.setData({ currentCity: "获取定位失败" });
      },
    })
  }
})