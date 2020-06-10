// pages/word/id.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath: ['/images/face.jpg'],
    topTips: false,
    animation: true,
    gender: '',
    age: '',
    beauty: '',
    expression: '',
    glasses: '',
    emotion: ''
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
          gender: '',
          age: '',
          beauty: '',
          expression: '',
          glasses: '',
          emotion: '',
          animation: true
        })
        setTimeout(()=>{
          wx.uploadFile({
            url: 'https://www.gaosong.site:3000/face',
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
                  gender: res.gender,
                  age: res.age,
                  beauty: res.beauty,
                  expression: res.expression,
                  glasses: res.glasses,
                  emotion: res.emotion,
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
    setTimeout(()=>{
      wx.request({
        url: 'https://www.gaosong.site:3000/face_first',
        success: (res) => {
          if (res.data === 'err') {
            this.setData({
              gender: '',
              age: '',
              beauty: '',
              expression: '',
              glasses: '',
              emotion: '',
              animation: false
            })
          } else {
            res = res.data
            this.setData({
              gender: res.gender,
              age: res.age,
              beauty: res.beauty,
              expression: res.expression,
              glasses: res.glasses,
              emotion: res.emotion,
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