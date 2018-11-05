import webHttp from './http_web'

var apiRequest = webHttp.apiRequest
var upload = webHttp.upload

export default {
  upload (data) {
    return upload(data)
  },

  user: {
    signin (param) {
      return apiRequest('/signin', 'POST', param)
    },

    login (param) {
      return apiRequest('/login', 'POST', param)
    }
  }
}
