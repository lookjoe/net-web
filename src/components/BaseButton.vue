<template>
    <div :class="['button', size, bgColor]">
        {{ text }}
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        bgColor: {
            type: String,
            required: true
        }
    },

    data () {
        return {
        }
    }
}
</script>

<style scoped>
.button {
    text-align: center;
    line-height: 40px;
    font-size: 18px;
    color: #fff;
    border-radius: 10px;
  }
.upload {
  width: 150px;
  height: 40px;
}
.red {
  background-color: red;
}
</style>
