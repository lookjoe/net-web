<template>
  <div class="hello">
    <div class="center">
      账号: <input type="text" name="text" v-model="userInfo.username"/>
      密码: <input type="password" name="password" v-model="userInfo.password"/>
      <input @click="signin" type="submit" value="注册" />
      <input @click="login" type="submit" value="登录" />
    </div>
    <div class="welcome">
      是否登陆：{{text}}
    </div>
    <img :src="imgSrc" class="img" alt="图片">
    <div class="img-box">
      <div class="" @click="changeAvtor()">
        选择图片并上传
      </div>
      <input class="file" style="display: none" @change="upload" type="file"/>
      <div class="">
        图片是否上传成功: {{upImg}}
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
      document.querySelector('input[type=file').click()
    },
    upload (e) {
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
      this.$api.upload(data)
        .then((res) => {
          this.upImg = res
        })
    },
    signin () {
      this.$api.user.signin()
        .then((res) => {
          if (res.error) {
            this.upImg = '失败'
          } else {
            this.text = res
          }
        })
    },

    login () {
      let user = {
        name: this.userInfo.username,
        password: this.userInfo.password
      }
      this.$api.user.login(user)
        .then((res) => {
          if (res.error) {
            this.text = res.error
          } else {
            this.text = res
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.center {
  /* width: 400px; */
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
