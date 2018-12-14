const app = getApp()
var requestUrl = app.globalData.requestUrl
var currentCity = app.globalData.currentCity

Component({

  /* 开启全局样式设置 */
  options: {
    addGlobalClass: true,
  },

  /* 组件的属性列表 */
  properties: {
    name: {
      type: String,
      value: 'Hot'
    }
  },

  /* 组件的初始数据 */
  data: {
    dataList: [],
    currentCity: '',
    cityshow: false,
    show_loading: true,  // 加载 gif 显示
    show_buttom: false   // 底部 显示
  },

  /* 组件声明周期函数 */
  lifetimes: {
    attached: function () {
      this.setData({
        currentCity: app.globalData.currentCity,
      })
      this.getUsData()
      this.setData({
        show_loading: false,
        show_buttom: true
      })
    },
    moved: function () {

    },
    detached: function () {

    },
  },

  /* 组件的方法列表 */
  methods: {
    getUsData() {
      let usMovieList
      let that = this;
      wx.request({
        url: requestUrl + '/v2/movie/in_theaters',
        method: 'GET',
        data: {
          count: 50,
          city: app.globalData.currentCity // 城市
        },
        header: { 'content-type': 'application/xml' },
        success: function (res) {
          console.log(res)
          let list = res.data.subjects
          if (res.statusCode == 200) {
            console.log(list)
            that.setData({
              dataList: list,
            })
          }
        },
        fail: function (err) {
          console.log(err)
        }
      })
    },
    mycity() {
      console.log(app.globalData.currentCity)
      this.setData({
        cityshow: true
      })
      this.getUsData()
    }
  }

})