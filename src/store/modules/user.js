import api from '@/api/common/api'
import showToast from '@/mixin'

import {
    SETUSERINFO,
    SETLOGINSTATUS,
    SETSIGNIN
} from '@/store/mutation-types'

const state = {
    // 用户信息
    userInfo: {},
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

    [SETLOGINSTATUS] (state, payload) {
        state.loginStatus = payload.loginStatus
    },

    [SETSIGNIN] (state, payload) {
        state.signinStatus = payload.signinStatus
    }
}

const actions = {
    async vuexLogin ({ commit }, data) {
        const { user, msg } = data
        let res = await api.user.login(user)
        localStorage.setItem('token', res.token)

        if (res.error) return
        if (msg) {
            showToast.methods.showSucToast(msg)
        }
        commit(SETLOGINSTATUS, { loginStatus: 1 })
        commit(SETUSERINFO, user)
    },

    async vuexSignin ({ commit }, data) {
        const { user, msg } = data
        let res = await api.user.signin(user)
        if (res.error) return

        // 需要成功提示传入 msg
        if (msg) {
            showToast.methods.showSucToast(msg)
        }
        commit(SETSIGNIN, { signinStatus: 1 })
    }
}

export default {
    // 命名空间
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
