// pages/first/first.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    filePath: "", // 文件路径
    filename: "" // 文件名
  },

  /**
   * 组件的方法列表
   */
  methods: {
    chooseFile: function() { // 点击选择文件按钮触发事件
      console.log("hello")
      var _that = this;
      wx.chooseMessageFile({ // 会话中选择文件API
        count: 1, // 可选文件个数
        type: 'file', // 文件类型
        success(res) { // 选择成功后的回调函数
          var size = res.tempFiles[0].size; // 文件大小
          var filename = res.tempFiles[0].name; // 文件名
          if (size > 1048590) { // 判断文件大小不能大于4M
            wx.showToast({ // 弹框提示
              title: '文件大小不能超过10MB！',
              icon: "none",
              duration: 2000,
              mask: true
            })
          } else if (filename.indexOf('.wav') == -1&&filename.indexOf('.mp3') == -1) { // 判断文件格式必须为pdf
            wx.showToast({
              title: '必须为音频格式的文件！',
              icon: "none",
              duration: 2000,
              mask: true
            })
          } else {
            _that.setData({
              filePath: res.tempFiles[0].path, // 保存文件地址到data
              filename: filename // 保存文件名
            })
            wx.showToast({
              title: '选择文件成功！'+filename,
              icon: "none",
              duration: 2000,
              mask: true
            })
          }
        }
      })
    },
    uploadFile: function(){ // 上传文件
      console.log('click')
      var _that = this;
        wx.uploadFile({ // 本地资源上传到服务器API
          url: 'https://10.166.106.151:5000/uploadFile', // 指定服务器接口URL
          filePath: _that.data.filePath, // 本地文件路径，即选择文件返回的路径
          name: 'file', // 上传文件的key，后台要用到
          timeout:3000,
          formData: { // 可额外添加字段，存于请求的body对象中
            'filename': _that.data.filename
          },
          success(res) {
            wx.showToast({
              title: '发送成功！'+res.data+res.statusCode,
              icon: "none",
              duration: 2000,
              mask: true
            })
          },
          fail(res){
            wx.showToast({
              title: '发送失败！',
              icon: "none",
              duration: 2000,
              mask: true
            })
          }
        })
    }
  }
})
