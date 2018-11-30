// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import mixin from '@/mixin'
import Api from '@/api/common/api'
import Strategy from '@/util/strategy'

Vue.config.productionTip = false

Vue.prototype.$api = Api
Vue.prototype.$check = Strategy

Vue.mixin(mixin)

/* eslint-disable no-new */
let a = new Vue({
    el: '#app',
    router,
    store,
    components: { 'w-app': App },
    template: '<w-app />'
})

console.log('a', a.onMixin)
