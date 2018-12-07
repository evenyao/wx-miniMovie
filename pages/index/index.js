let app = getApp()

Page({
  data: {
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
        "iconPath": "/pages/img/my2.png",
        "selectedIconPath": "/pages/img/my1.png",
        "text": "我的"
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
  onLoad: function (option) {

  }
})
