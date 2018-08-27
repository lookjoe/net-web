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
    </div>
    <!-- <form class="" action="http://localhost:3000/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="f1" value="input">
      <input type="submit" name="f2s" value="提交">
    </form> -->
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
      console.log('data', formData.get('file'))
      if (!e || !window.FileReader) return
      let reader = new FileReader()
      reader.readAsDataURL(files)
      reader.onloadend = (e) => {
        this.imgSrc = e.target.result
      }
      const opts = {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json'
        // },
        body: formData
      }
      let url = `http://localhost:3000/upload`
      fetch(url, opts)
        .then((res) => {
          return res.json()
        })
        .then(data => {
          console.log('res,data', data)
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
    signin () {
      const opts = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
      let url = `http://localhost:3000/signin`
      fetch(url, opts)
        .then((res) => {
          console.log('res', res)
          return res.json()
        })
        .then(data => {
          console.log('res,data', data)
          this.text = data.msg
        })
        .catch((err) => {
          console.log('err', err)
        })
    },

    login () {
      let user = {
        name: this.userInfo.username,
        password: this.userInfo.password
      }
      const param = JSON.stringify(user)
      const url = `http://localhost:3000/login`
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: param
      })
        .then(res => {
          return res.json()
        })
        .then(data => {
          if (data.error) {
            this.text = data.error
          } else {
            this.text = data.msg
          }
        })
        .catch((err) => {
          console.log('err', err)
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
