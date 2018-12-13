// pages/detail/detail.js

var main
var us
var find

Page({

  /**
   * 页面的初始数据
   */
  data: {
    main,
    us,
    find
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // 读首页 storage 数据
    wx.getStorage({
      key: 'mainMovieList',
      success: function(res) {
        let info = res.data
        // 接收首页传值
        if (options.main) {
          let id = options.id
          that.setData({
            info,
            id,
            main: 1,
          })
        }
      },
    })

    // 读北美页 storage 数据
    wx.getStorage({
      key: 'usMovieList',
      success: function (res) {
        let info = res.data
        // 接收北美页传值
        if (options.us) {
          let id = options.id
          let infoUs = info[id].subject
          that.setData({
            info: infoUs,
            id,
            us: 1,
          })
          //console.log(that.data.info)
          //console.log(that.data.id)
        }
      },
    })

    // 读首页 storage 数据
    wx.getStorage({
      key: 'searchMovieList',
      success: function (res) {
        let info = res.data
        // 接收首页传值
        if (options.find) {
          let id = options.id
          that.setData({
            info,
            id,
            find: 1,
          })
        }
      },
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})