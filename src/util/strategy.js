import showToast from '@/mixin'
// 策略模式 验证满足条件 例如账号不能为空 使用情况 多条件判断
// 策略对象
let strategys = {
    // 是否为空
    isEmpty: (value, error) => {
        if (!value) {
            return error
        }
    }
}

// 属性名错误处理
let testObj = {
    test: (t) => {
        if (!t.strategy) {
            throw new Error('strategy')
        }
        if (!t.error) {
            // throw new Error('error')
        }
    }
}

class Validator {
    constructor () {
        this.cache = []
    }

    addRule (msg, rules) {
        rules.forEach(element => {
            if (!element.strategy || !element.error) {
                this.cache.push(() => {
                    testObj.test.call(this, element)
                })
                return
            }
            let strategysAry = element.strategy.split(':')
            let error = element.error
            this.cache.push(() => {
                let strategy = strategysAry.shift()
                strategysAry.unshift(msg)
                strategysAry.push(error)
                return strategys[strategy].apply(this, strategysAry)
            })
        })
    }

    check () {
        for (let i = 0; i < this.cache.length; i++) {
            let msg = this.cache[i]() // 开始效验 并取得效验后的返回信息
            if (msg) {
                showToast.methods.showErrToast(msg)
            }
            if (msg) {
                return msg
            }
        }
    }
}

export default function check () {
    return new Validator()
}
