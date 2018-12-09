
Component({

  /* 开启全局样式设置 */
  options: {
    addGlobalClass: true,
  },

  /* 组件的属性列表 */
  properties: {
    name: {
      type: String,
      value: 'Index'
    }
  },

  /* 组件的初始数据 */
  data: {
    loadFlag: true,
    count: '',
    pull_loading: false,
    dataList: [],
    content_waiting_show: false,
  },

  /* 组件声明周期函数 */
  lifetimes: {
    attached: function () {
      // 显示设置
      var res = wx.getSystemInfoSync();
      var device = new RegExp("iOS");
      var result = device.test(res.system);
      let tmp = 0;
      let h = res.windowHeight - res.windowWidth / 750 * 116 - tmp;
      this.setData({
        main_height: h,
      });
      wx.showLoading({
        title: '加载中',
      })
      //初始化
      this.getMainData(true)
    },
    moved: function () {

    },
    detached: function () {

    },
  },

  /* 组件的方法列表 */
  methods: {
    //首页数据
    getMainData(first_loading) {
      if (first_loading) {
        this.setData({
          content_waiting_show: false,
        })
      }
      let mainMovieList
      let that = this;
      wx.request({
        url: 'https://douban.uieee.com/v2/movie/top250',
        method: 'GET',
        header: { 'content-type': 'application/xml' },
        data: {
          start: 0,    // 从头请求
          count: 30    // 每次请求的数目
        },
        success: function(res) {
          console.log(res)
          let list = res.data.subjects
          if (res.statusCode == 200) {
            console.log(list)
            // setStorage 本地存储方式拿数据
            wx.setStorage({
              key: 'mainMovieList',
              data: list,
              success: function(res){
                console.log('异步缓存成功')
              }
            })
            // 取数据 异步
            wx.getStorage({
              key: 'mainMovieList',
              success(res) {
                mainMovieList = res.data
                that.setData({
                  dataList: mainMovieList,
                  mainMovieList,  // 传递给详情页的值
                  content_waiting_show: true,
                  count: 31  // 增加数目
                })
              }
            })
          }
        },
        fail: function(err) {
          console.log(err)
        },
        complete: () => {
          wx.hideLoading()
        }
      })
    },

    // 懒加载
    scrollDown() {
      console.log('到底了')
      let mainMovieList
      let that = this;
      if (this.data.loadFlag) {
        this.setData({
          pull_loading: true
        })
        wx.request({
          url: 'https://douban.uieee.com/v2/movie/top250',
          method: 'GET',
          header: { 'content-type': 'application/xml' },
          data: {
            start: that.data.count,    // 继续请求
            count: 20    // 每次请求的数目
          },
          success: function(res) {
            if (res.statusCode == 200) {
              console.log(res)
              let tempData = that.data.dataList.concat(res.data.subjects);
              // setStorage 本地存储方式拿数据
              wx.setStorage({
                key: 'mainMovieList',
                data: tempData,
                success: function (res) {
                  console.log('异步缓存成功')
                }
              })
              // 取数据 异步
              wx.getStorage({
                key: 'mainMovieList',
                success(res) {
                  mainMovieList = res.data
                  that.setData({
                    count: that.data.count + 21,
                    dataList: mainMovieList,
                    mainMovieList,  // 传递给详情页的值
                    loadFlag: tempData.length >= parseInt(res.count) ? false : true,
                    pull_loading: false,
                  })
                }
              })
              console.log(that.data.dataList)
            }
          },
          fail: function(err) {
            console.log(err)
          }
        })
      } else {
        return
      }
    }
  }
})