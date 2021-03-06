Page({
  data: {
    imagePath: ['/images/plant.jpg'],
    animation: true,
    topTips: false,
    name_1: '',
    score_1: '',
    name_2: '',
    score_2: '',
    name_3: '',
    score_3: '',
  },
  choosePic: function() {
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
          name_2: '',
          score_2: '',
          name_3: '',
          score_3: '',
          animation: true
        })
        setTimeout(()=>{
          wx.uploadFile({
            url: 'https://www.gaosong.site:4000/plant',
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
                  myRes[attr_name] = res[i].name
                  let score = res[i].score.toFixed(4).substring(2, 6)
                  myRes[attr_score] = score.charAt(0) == '0' ? score.substring(1, 2) + '.' + score.substring(2, 4) + '%' : score.substring(0, 2) + '.' + score.substring(2, 4) + '%'
                }
                this.setData({
                  name_1: myRes.name_0,
                  score_1: myRes.score_0,
                  name_2: myRes.name_1,
                  score_2: myRes.score_1,
                  name_3: myRes.name_2,
                  score_3: myRes.score_2,
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
  onLoad: function(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    setTimeout(() => {
      wx.request({
        url: 'https://www.gaosong.site:4000/plant_first',
        success: (res) => {
          if (res.data === 'err') {
            this.setData({
              name_1: '',
              score_1: '',
              name_2: '',
              score_2: '',
              name_3: '',
              score_3: '',
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
              myRes[attr_name] = res[i].name
              let score = res[i].score.toFixed(4).substring(2, 6)
              myRes[attr_score] = score.charAt(0) == '0' ? score.substring(1, 2) + '.' + score.substring(2, 4) + '%' : score.substring(0, 2) + '.' + score.substring(2, 4) + '%'
            }
            this.setData({
              name_1: myRes.name_0,
              score_1: myRes.score_0,
              name_2: myRes.name_1,
              score_2: myRes.score_1,
              name_3: myRes.name_2,
              score_3: myRes.score_2,
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
  onShow: function() {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})