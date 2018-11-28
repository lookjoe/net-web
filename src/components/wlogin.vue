<template>
    <div class="hello">
        <div class="center">
            账号: <input type="text" name="text" v-model="userInfo.username" />
            密码: <input type="password" name="password" v-model="userInfo.password" />
            <input @click="signin()" type="submit" value="注册" />
            <input @click="login()" type="submit" value="登录" />
        </div>
        <div class="welcome">
            是否登陆：{{ loginStatus }}
        </div>
        <div class="signin">
            注册: {{ signinStatus }}
        </div>
    </div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'

export default {
    data () {
        return {
            userInfo: {
                username: '',
                password: ''
            }
        }
    },

    computed: {
        ...mapGetters([
            'getUserInfo',
            'getLoginStatus',
            'getSignInStatus'
        ]),

        loginStatus () {
            return this.getLoginStatus ? '已经登陆' : '未登陆'
        },

        signinStatus () {
            return this.getSignInStatus ? '成功' : ''
        }
    },

    methods: {
        ...mapActions([
            'vuexLogin',
            'vuexSignin'
        ]),

        signin () {
            let data = {
                name: this.userInfo.username,
                password: this.userInfo.password
            }
            this.vuexSignin(data)
        },

        login () {
            let user = {
                name: this.userInfo.username,
                password: this.userInfo.password
            }
            this.vuexLogin(user)
        }
    },

    created () {
        if (!this.getLoginStatus) {
            localStorage.removeItem('token')
        }
    }
}
</script>

<style scoped>
.welcome {
    text-align: left;
    margin-top: 50px;
    width: 200px;
}
.signin {
    text-align: left;
    margin-top: 50px;
    margin-bottom: 100px;
    width: 200px;
}
</style>
