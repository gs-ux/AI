Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath: ['/images/license.jpg'],
    animation: true,
    topTips: false,
    num: '',
    code: '',
    name: '',
    address: '',
    person: '',
    date: ''
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
          animation: true
        })
        wx.uploadFile({
          url: 'https://www.gaosong.site:5000/license',
          filePath: tempFilePaths[0],
          name: 'file',
          success: (res) => {
            if (res.data === 'err') {
              this.setData({
                num: '',
                code: '',
                name: '',
                address: '',
                person: '',
                date: '',
                animation: false
              })
              this.setData({ topTips: true })
              setTimeout(() => {
                this.setData({ topTips: false })
              }, 3000)
            } else {
              res = JSON.parse(res.data)
              this.setData({
                num: res.num,
                code: res.code,
                name: res.name,
                address: res.address,
                person: res.person,
                date: res.date,
                animation: false
              })
            }
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTimeout(()=>{
      wx.request({
        url: 'https://www.gaosong.site:5000/license_first',
        success: (res) => {
          if (res.data === 'err') {
            this.setData({
              num: '',
              code: '',
              name: '',
              address: '',
              person: '',
              date: '',
              animation: false
            })
            this.setData({ topTips: true })
            setTimeout(() => {
              this.setData({ topTips: false })
            }, 3000)
          } else {
            res = res.data
            this.setData({
              num: res.num,
              code: res.code,
              name: res.name,
              address: res.address,
              person: res.person,
              date: res.date,
              animation: false
            })
          }
        }
      })
    }, 2000)
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