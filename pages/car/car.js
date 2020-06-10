Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath: ['/images/car.jpg'],
    animation: true,
    topTips: false,
    name_1: '',
    score_1: '',
    year_1: '',
    name_2: '',
    score_2: '',
    year_2: '',
    name_3: '',
    score_3: '',
    year_3: '',
    name_4: '',
    score_4: '',
    year_4: '',
    name_5: '',
    score_5: '',
    year_5: ''
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
          name_1: '',
          score_1: '',
          year_1: '',
          name_2: '',
          score_2: '',
          year_2: '',
          name_3: '',
          score_3: '',
          year_3: '',
          name_4: '',
          score_4: '',
          year_4: '',
          name_5: '',
          score_5: '',
          year_5: '',
          animation: true
        })
        setTimeout(()=>{
          wx.uploadFile({
            url: 'https://www.gaosong.site:4000/car',
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
                var myRes = {}
                for (let i = 0; i < res.length; i++) {
                  let attr_name = 'name_' + i
                  let attr_score = 'score_' + i
                  let attr_year = 'year_' + i
                  myRes[attr_name] = res[i].name
                  let score = res[i].score.toFixed(4).substring(2, 6)
                  myRes[attr_score] = score.charAt(0) == '0' ? score.substring(1, 2) + '.' + score.substring(2, 4) + '%' : score.substring(0, 2) + '.' + score.substring(2, 4) + '%'
                  myRes[attr_year] = res[i].year
                }
                this.setData({
                  name_1: myRes.name_0,
                  score_1: myRes.score_0,
                  year_1: myRes.year_0,
                  name_2: myRes.name_1,
                  score_2: myRes.score_1,
                  year_2: myRes.year_1,
                  name_3: myRes.name_2,
                  score_3: myRes.score_2,
                  year_3: myRes.year_2,
                  name_4: myRes.name_3,
                  score_4: myRes.score_3,
                  year_4: myRes.year_3,
                  name_5: myRes.name_4,
                  score_5: myRes.score_4,
                  year_5: myRes.year_4,
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
        url: 'https://www.gaosong.site:4000/car_first',
        success: (res) => {
          if (res.data === 'err') {
            this.setData({
              name1: '',
              score_1: '',
              year_1: '',
              name2: '',
              score_2: '',
              year_2: '',
              name3: '',
              score_3: '',
              year_3: '',
              name4: '',
              score_4: '',
              year_4: '',
              name5: '',
              score_5: '',
              year_5: '',
              animation: false
            })
            this.setData({ topTips: true })
            setTimeout(() => {
              this.setData({ topTips: false })
            }, 3000)
          } else {
            res = res.data
            var myRes = {}
            for (let i = 0; i < res.length; i++) {
              let attr_name = 'name_' + i
              let attr_score = 'score_' + i
              let attr_year = 'year_' + i
              myRes[attr_name] = res[i].name
              let score = res[i].score.toFixed(4).substring(2, 6)
              myRes[attr_score] = score.charAt(0) == '0' ? score.substring(1, 2) + '.' + score.substring(2, 4) + '%' : score.substring(0, 2) + '.' + score.substring(2, 4) + '%'
              myRes[attr_year] = res[i].year
            }
            this.setData({
              name_1: myRes.name_0,
              score_1: myRes.score_0,
              year_1: myRes.year_0,
              name_2: myRes.name_1,
              score_2: myRes.score_1,
              year_2: myRes.year_1,
              name_3: myRes.name_2,
              score_3: myRes.score_2,
              year_3: myRes.year_2,
              name_4: myRes.name_3,
              score_4: myRes.score_3,
              year_4: myRes.year_3,
              name_5: myRes.name_4,
              score_5: myRes.score_4,
              year_5: myRes.year_4,
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