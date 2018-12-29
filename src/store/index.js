import Vue from 'vue'
import Vuex from 'vuex'

import moduleUser from '@/store/modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        moduleUser
    }
})
