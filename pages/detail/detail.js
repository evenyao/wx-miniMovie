// pages/detail/detail.js

var main
var us

Page({

  /**
   * 页面的初始数据
   */
  data: {
    main,
    us,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 接收首页传递过来的值
    if (options.main) {
      let info = JSON.parse(options.info)
      let id = options.id
      this.setData({
        info,
        id,
        main: 1,
      })
    }
    // 接收北美页传递过来的值
    if (options.us) {
      let dataInfo = JSON.parse(options.info)
      let id = options.id
      let info = dataInfo[id].subject
      this.setData({
        info,
        id,
        us: 1,
      })
    }
    console.log(this.data.info)
    console.log(this.data.id)
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