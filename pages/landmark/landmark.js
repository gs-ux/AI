Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath: ['/images/landmark.jpg'],
    animation: true,
    topTips: false,
    name: ''
  },
  choosePic: function () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        var tempFilePaths = res.tempFilePaths
        this.setData({
          imagePath: tempFilePaths,
          name: '',
          animation: true
        })
        setTimeout(()=>{
          wx.uploadFile({
            url: 'https://www.gaosong.site:4000/landmark',
            filePath: tempFilePaths[0],
            name: 'file',
            success: (res) => {
              if (res.data === 'err') {
                this.setData({
                  animation: false
                })
                this.setData({ topTips: true })
                setTimeout(() => {
                  this.setData({ topTips: false })
                }, 3000)
              } else {
                res = JSON.parse(res.data)
                this.setData({
                  name: res.landmark,
                  animation: false
                })
              }
            }
          })
        }, 2000)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(() => {
      wx.request({
        url: 'https://www.gaosong.site:4000/landmark_first',
        success: (res) => {
          if (res.data === 'err') {
            this.setData({
              name: '',
              animation: false
            })
            this.setData({ topTips: true })
            setTimeout(() => {
              this.setData({ topTips: false })
            }, 3000)
          } else {
            res = res.data
            this.setData({
              name: res.landmark,
              animation: false
            })
          }
        }
      })
    }, 2000)
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