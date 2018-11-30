<template>
    <transition name="toast-bounce">
        <div :class="['toast', type === 'suc' ? 'suc' : 'err']">
            <span class="toast-msg">{{ message }}</span>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },

    data () {
        return {
        }
    },

    created () {
    }
}
</script>

<style scoped>
.toast-bounce-enter,
.toast-bounce-leave {
    opacity: 0;
}

.toast {
    box-sizing: border-box;
    position: fixed;
    top: 10px;
    left: 0;
    right: 0;
    z-index: 9999;
    width: 100%;
    height: 30px;
    opacity: 0.8;
    transition: all 0.3s ease;
}

.suc {
    background: #33C27C;
}

.err {
    background: #F76260;
}

.toast-msg {
    line-height: 30px;
    text-align: center;
    color: #fff;
}
</style>
