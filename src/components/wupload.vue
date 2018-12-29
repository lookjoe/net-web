<template>
    <div class="upload">
        <img :src="imgSrc" class="img" alt="图片" />
        <div class="img-box">
            <BaseButton
                @click.native="changeAvtor"
                v-bind="btnPost"
            />
            <input class="file" style="display: none" @change="upload" type="file" />
            <div>
                图片是否上传成功: {{ upImg }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {
    },

    data () {
        return {
            btnPost: {
                text: '选择图片并上传',
                size: 'upload',
                bgColor: 'red'
            },
            upImg: '',
            imgSrc: '../static/avtor.jpg'
        }
    },

    methods: {
        changeAvtor () {
            console.log('1')
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
        }
    }
}
</script>

<style scoped>
.img {
    width: 300px;
    height: 200px;
}
.img-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
