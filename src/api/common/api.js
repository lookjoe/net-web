import webHttp from './http_web'

const apiRequest = webHttp.apiRequest
const upload = webHttp.upload

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
