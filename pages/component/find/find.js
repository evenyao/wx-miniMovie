let app = getApp()
var requestUrl = app.globalData.requestUrl
var requestUrl2 = app.globalData.requestUrl2
Component({

  /* 开启全局样式设置 */
  options: {
    addGlobalClass: true,
  },

  /* 组件的属性列表 */
  properties: {
    name: {
      type: String,
      value: 'Find'
    }
  },

  /* 组件的初始数据 */
  data: {
    search_value: '',
    loading: false,
  },

  /* 组件声明周期函数 */
  lifetimes: {
    attached: function () {

    },
    moved: function () {

    },
    detached: function () {

    },
  },

  /* 组件的方法列表 */
  methods: {
    // 监听 input 输入
    changeValue: function (event) {
      let that = this;
      var search = event.detail.value;
      that.setData({
        search_value: search
      })
    },
    // 搜索请求
    search() {
      let that = this;
      that.setData({
        loading: true,
      })
      let keyword = that.data.search_value
      console.log(keyword)
      wx.request({
        url: requestUrl2 + '/v2/movie/search',
        method: 'GET',
        data: {
          q: keyword
        },
        header: { 'content-type': 'application/xml' },
        success: function (res) {
          console.log(res)
          let list = res.data.subjects
          if (res.statusCode == 200) {
            console.log(list)
            that.setData({
              dataList: list,
              loading: false,
              show_buttom: true
            })
          }
        },
        fail: function (err) {
          console.log(err)
        }
      })
    }
  }

})