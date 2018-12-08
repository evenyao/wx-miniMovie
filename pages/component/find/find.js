var app = getApp();

Component({

  /* 开启全局样式设置 */
  options: {
    addGlobalClass: true,
  },

  /* 组件的属性列表 */
  properties: {
    name: {
      type: String,
      value: 'My'
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
        url: 'https://douban.uieee.com/v2/movie/search',
        method: 'GET',
        data: {
          q: keyword
        },
        header: { 'content-type': 'application/xml' },
        success: function (res) {
          console.log(res)
          let list = res.data.subjects
          let listDetailValue = JSON.stringify(list)  // JSON 格式化
          if (res.statusCode == 200) {
            console.log(list)
            that.setData({
              dataList: list,
              listDetailValue,  // 传递给详情页的值
              loading: false
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