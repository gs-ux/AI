Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath: ['/images/car_drive.jpg'],
    animation: true,
    topTips: false,
    car_num: '',
    car_type: '',
    person: '',
    address: '',
    use_prop: '',
    model: '',
    car_identify: '',
    engine_num: '',
    reg_date: '',
    get_date: ''
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
          car_num: '',
          car_type: '',
          person: '',
          address: '',
          use_prop: '',
          model: '',
          car_identify: '',
          engine_num: '',
          reg_date: '',
          get_date: '',
          animation: true
        })
        setTimeout(()=>{
          wx.uploadFile({
            url: 'https://www.gaosong.site:5000/car',
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
                  car_num: res.car_num,
                  car_type: res.car_type,
                  person: res.person,
                  address: res.address,
                  use_prop: res.use_prop,
                  model: res.model,
                  car_identify: res.car_identify,
                  engine_num: res.engine_num,
                  reg_date: res.reg_date,
                  get_date: res.get_date,
                  animation: false
                })
              }
            }
          })
        }, 1000)
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
        url: 'https://www.gaosong.site:5000/car_drive_first',
        success: (res) => {
          if (res.data === 'err') {
            this.setData({
              car_num: '',
              car_type: '',
              person: '',
              address: '',
              use_prop: '',
              model: '',
              car_identify: '',
              engine_num: '',
              reg_date: '',
              get_date: '',
              animation: false
            })
            this.setData({ topTips: true })
            setTimeout(() => {
              this.setData({ topTips: false })
            }, 3000)
          } else {
            res = res.data
            this.setData({
              car_num: res.car_num,
              car_type: res.car_type,
              person: res.person,
              address: res.address,
              use_prop: res.use_prop,
              model: res.model,
              car_identify: res.car_identify,
              engine_num: res.engine_num,
              reg_date: res.reg_date,
              get_date: res.get_date,
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