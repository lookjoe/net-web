import Vue from 'vue'
import Toast from '@/components/Wtoast'

const ToastConstructor = Vue.extend(Toast)

const toastComponent = (propsData, time) => {
    const t = new ToastConstructor({
        propsData
    })
    const $toast = t.$mount().$el
    // 文档外渲染之后挂载 使用 el: '#app' 会替换#app 可以创建空的<div>
    document.getElementById('app').appendChild($toast)

    // 卸载
    setTimeout(() => {
        $toast.parentNode.removeChild($toast)
    }, time)
}

export default {
    methods: {
        showToast (message, type, time = 1000) {
            toastComponent({
                message,
                type
            }, time)
        },

        showErrToast (message, time) {
            this.showToast(message, 'err', time)
        },

        showSucToast (message, time) {
            this.showToast(message, 'suc', time)
        }
    }
}
