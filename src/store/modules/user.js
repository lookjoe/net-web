import api from '@/api/common/api'
import showToast from '@/mixin'

import {
    SETUSERINFO,
    SETLOGINSTATUS,
    SETSIGNIN
} from '@/store/mutations-type'

const state = {
    // 用户信息
    userInfo: { },
    // 登陆状态
    loginStatus: 0,
    // 注册状态
    signinStatus: 0
}

const getters = {
    getUserInfo (state) {
        return state.userInfo
    },

    getLoginStatus (state) {
        return state.loginStatus
    },

    getSignInStatus (state) {
        return state.signinStatus
    }
}

const mutations = {
    [SETUSERINFO] (state, user) {
        state.userInfo = user
    },

    [SETLOGINSTATUS] (state, status) {
        state.loginStatus = status
    },

    [SETSIGNIN] (state, status) {
        state.signinStatus = status
    }
}

const actions = {
    async vuexLogin ({ commit }, data) {
        const { user, msg } = data

        let res = await api.user.login(user)
        localStorage.setItem('token', res.token)
        if (res.error) return false

        if (msg) {
            showToast.methods.showSucToast(msg)
        }
        commit(SETLOGINSTATUS, 1)
        commit(SETUSERINFO, user)
    },

    async vuexSignin ({ commit }, data) {
        const { user, msg } = data
        let res = await api.user.signin(user)
        if (res.error) return false

        // 需要成功提示传入 msg
        if (msg) {
            showToast.methods.showSucToast(msg)
        }
        commit(SETSIGNIN, 1)
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}
