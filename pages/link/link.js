// web-view 
Page({

  data: {

  },

  onLoad: function (options) {
    // web-view 接收 navigator 传递过来的 url 地址
    if (options.url) {
      this.setData({
        url: options.url
      })
    }
  },

})