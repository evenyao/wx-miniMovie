// pages/detail/detail.js
let app = getApp()
var requestUrl = app.globalData.requestUrl
var judgeIndex = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    showAll: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let id = options.id
    that.setData({
      id,
    })
    console.log(that.data.id)
    that.getStoryInfo()
  },

  // 请求电影详情
  getStoryInfo: function () {
    let that = this;
    let id = that.data.id
    wx.request({
      url: requestUrl + '/v2/movie/subject/' + id,
      method: 'GET',
      header: { 'content-type': 'application/xml' },
      success: function (res) {
        let detailInfo = res.data
        let videoInfo = detailInfo.trailer_urls
        let imgInfo = detailInfo.trailers
        console.log(videoInfo)
        console.log(detailInfo)
        console.log(imgInfo)
        that.setData({
          detailInfo,
          showPage: true,
          videoInfo
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
    console.log('详情')
  },

  showAll() {
    console.log(this.data.showAll)
    if (this.data.showAll == false) {
      this.setData({
        showAll: true
      })
    } else {
      this.setData({
        showAll: false
      })
    }
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