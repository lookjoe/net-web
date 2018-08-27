import webHttp from './http_web'

var apiRequest = webHttp.apiRequest
var upload = webHttp.upload

export default {
  upload (data) {
    return upload(data)
  },

  user: {
    signin () {
      return apiRequest('/signin', 'POST')
    },

    login (param) {
      return apiRequest('/login', 'POST', param)
    }
  }
}
