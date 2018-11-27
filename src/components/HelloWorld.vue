<template>
  <div class="hello">
    <div class="center">
      账号: <input type="text" name="text" v-model="userInfo.username" />
      密码: <input type="password" name="password" v-model="userInfo.password" />
      <input @click="signin()" type="submit" value="注册" />
      <input @click="login()" type="submit" value="登录" />
    </div>
    <div class="welcome">
      是否登陆：{{ text }}
    </div>
    <img :src="imgSrc" class="img" alt="图片" />
    <div class="img-box">
      <div  @click="changeAvtor()">
        选择图片并上传
      </div>
      <input class="file" style="display: none" @change="upload" type="file" />
      <div>
        图片是否上传成功: {{ upImg }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {
        username: '',
        password: ''
      },
      text: '',
      upImg: '',
      imgSrc: '../static/avtor.jpg'
    }
  },
  methods: {
    changeAvtor () {
      document.querySelector('input[type=file]').click()
    },

    async upload (e) {
      let files = e.target.files[0]
      const formData = new FormData()
      formData.append('file', files)
      if (!e || !window.FileReader) return
      let reader = new FileReader()
      reader.readAsDataURL(files)
      reader.onloadend = (e) => {
        this.imgSrc = e.target.result
      }
      const data = formData
      let resUrl = await this.$api.upload(data)
      this.upImg = resUrl
    },

    async signin () {
      let data = {
        name: this.userInfo.username,
        password: this.userInfo.password
      }
      let res = await this.$api.user.signin(data)
      this.text = res
    },

    async login () {
      let user = {
        name: this.userInfo.username,
        password: this.userInfo.password
      }
      let res = await this.$api.user.login(user)
      console.log('res', res)
      if (res.error) {
        this.text = res.error
        return
      }
      this.text = res
    }
  },

  created () {
  }
}
</script>

<style scoped>
.hello {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.welcome {
  margin-top: 50px;
  width: 200px;
  height: 100px;
}
.img {
  width: 300px;
  height: 200px;
}
</style>
