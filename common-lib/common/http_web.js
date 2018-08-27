import config from '../config/common'

var SERVER_URL = config.SERVER_URL

// 判断状态吗
function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

// fecth .json()
function parseJSON (response) {
    return response.json()
}

// 处理msg
function checkCode (data) {
  if (data.msg) {
    return data.msg
  }
  return data
}

function apiRequest (path, method = 'GET', data = null) {
  const options = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (data) {
    options.body = JSON.stringify(data)
  }

  const url = SERVER_URL + path

  options.method = method
  // 返回promise
  return window
    .fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(checkCode)
}

function uploadImg (url, data, onProgress = e => e) {
  return new Promise((resolve, reject) => {
    var xhr = new window.XMLHttpRequest()
    xhr.open('POST', url)
    xhr.onload = (e) => {
      // resolve(e.target.responseText)
      resolve(JSON.parse(e.target.responseText))
    }
    xhr.onerror = reject
    function updateProgress (event) {
      if (event.lengthComputable) {
        var percent = Math.round((event.loaded / event.total) * 100)
        onProgress(percent)
        // 调用callback
      }
    }
    if (xhr.onload) {
      xhr.upload.onprogress = updateProgress // 上传的progress事件
    }
    xhr.send(data)
  })
}

function upload (data, onProgress) {
    var url = SERVER_URL + '/upload'
    return uploadImg(url, data, onProgress)
      .then((res) => {
        return res
      })
      // .then(parseJSON)
      .then(checkCode)
}

export default {
  apiRequest,
  upload
}
