Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath: ['/images/id.jpg'],
    topTips: false,
    animation: true,
    name: '',
    sex: '',
    nation: '',
    birth: '',
    address: '',
    id: ''
  },
  choosePic: function () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          animation: true
        })
        var tempFilePaths = res.tempFilePaths

        this.setData({
          name: '',
          sex: '',
          nation: '',
          birth: '',
          address: '',
          id: '',
          imagePath: tempFilePaths
        })
        wx.uploadFile({
          url: 'https://www.gaosong.site:5000/idFront',
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
                name: res.name,
                sex: res.sex,
                nation: res.nation,
                birth: res.birth,
                address: res.address,
                id: res.id_number,
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
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(()=>{
      wx.request({
        url: 'https://www.gaosong.site:5000/idFront_first',
        success: (res) => {
          if (res.data === 'err') {
            this.setData({
              name: '',
              sex: '',
              nation: '',
              birth: '',
              address: '',
              id: '',
              animation: false
            })
            this.setData({ topTips: true })
            setTimeout(() => {
              this.setData({ topTips: false })
            }, 3000)
          } else {
            res = res.data
            this.setData({
              name: res.name,
              sex: res.sex,
              nation: res.nation,
              birth: res.birth,
              address: res.address,
              id: res.id_number,
              animation: false
            })
          }
        }
      })
    }, 1000)
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