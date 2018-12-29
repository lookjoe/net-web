<template>
    <div class="login">
        <Wlogin />
        <Wupload />
    </div>
</template>

<script>
import Wlogin from '@/components/wlogin'
import Wupload from '@/components/wupload'

export default {
    components: {
        'Wlogin': Wlogin,
        'Wupload': Wupload
    },

    data () {
        return {}
    },

    methods: {
    },

    created () {
    }
}
</script>

<style scoped>
.login {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
