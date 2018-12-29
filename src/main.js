// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import mixin from '@/mixin'
import Api from '@/api/common/api'
import Strategy from '@/util/strategy'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

Vue.config.productionTip = false

Vue.prototype.$api = Api
Vue.prototype.$check = Strategy
Vue.prototype.$a = mixin
// Vue.mixin(mixin)

const requireComponent = require.context(
    './components',
    false,
    // b 或 B开头的基础
    /^\.\/[b|B].+\.vue$/
)

requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName)
    const componentName = upperFirst(
        camelCase(
            fileName.replace(/\.\w+$/, '')
        )
    )
    Vue.component(componentName, componentConfig.default || componentConfig)
})
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { 'w-app': App },
    template: '<w-app />'
})
