import Vue from 'vue'
import Toast from '@/components/wtoast'

const ToastConstructor = Vue.extend(Toast)

const toastComponent = (propsData, time) => {
    const t = new ToastConstructor({
        propsData
    })
    const $toast = t.$mount().$el
    // 文档外渲染之后挂载
    document.getElementById('app').appendChild($toast)

    // 卸载
    setTimeout(() => {
        $toast.parentNode.removeChild($toast)
    }, time)
}

// 参数解构赋值默认值
const showToast = (message, type, time = 1000) => {
    toastComponent({
        message,
        type
    }, time)
}

export default {
    methods: {
        showErrToast (message, time) {
            showToast(message, 'err', time)
        },

        showSucToast (message, time) {
            showToast(message, 'suc', time)
        }
    }
}
