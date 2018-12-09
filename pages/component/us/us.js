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
      value: 'Car'
    }
  },

  /* 组件的初始数据 */
  data: {
    dataList: [],
    show_loading: true,  // 加载 gif 显示
    show_buttom: false   // 底部 显示
  },

  /* 组件声明周期函数 */
  lifetimes: {
    attached: function () {
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
    getUsData(){
      let usMovieList
      let that = this;
      wx.request({
        url: 'https://douban.uieee.com/v2/movie/us_box',
        method: 'GET',
        header: { 'content-type': 'application/xml' },
        success: function (res) {
          console.log(res)
          let list = res.data.subjects
          if (res.statusCode == 200) {
            console.log(list)
            // setStorage 本地存储方式存数据
            wx.setStorage({
              key: 'usMovieList',
              data: list,
              success: function (res) {
                console.log('异步缓存成功')
              }
            })
            // 取数据 异步
            wx.getStorage({
              key: 'usMovieList',
              success(res) {
                usMovieList = res.data
                that.setData({
                  dataList: usMovieList,
                  usMovieList,  
                })
              }
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