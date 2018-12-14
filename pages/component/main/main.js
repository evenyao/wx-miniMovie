
Component({

  /* 开启全局样式设置 */
  options: {
    addGlobalClass: true,
  },

  /* 组件的属性列表 */
  properties: {
    name: {
      type: String,
      value: 'Main'
    }
  },

  /* 组件的初始数据 */
  data: {
    loadFlag: true,
    count: '',
    pull_loading: false,
    dataList: [],
    content_waiting_show: false,
    canRequest: true,
    maxCount: 250,
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
            that.setData({
              dataList: list,
              content_waiting_show: true,
              count: 31  // 增加数目
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
      if (this.data.canRequest) {
        if (this.data.count < this.data.maxCount) {
          this.setData({
            canRequest: false
          })
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
                count: 20,    // 每次请求的数目
              },
              success: function (res) {
                if (res.statusCode == 200) {
                  console.log(res)
                  let tempData = that.data.dataList.concat(res.data.subjects);
                  that.setData({
                    count: that.data.count + 21,
                    dataList: tempData,
                    loadFlag: tempData.length >= parseInt(res.count) ? false : true,
                    pull_loading: false,
                    canRequest: true
                  })
                }
              },
              fail: function (err) {
                console.log(err)
              }
            })
          } else {
            return
          }
        } else {
          console.log('已经不能加载了')
          this.setData({
            loadFlag: false,
          })
        }
      }
    }
  }
})