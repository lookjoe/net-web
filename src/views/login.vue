<template>
    <div class="login">
        <w-login />
        <w-upload />
    </div>
</template>

<script>
import Wlogin from '@/components/wlogin'
import Wupload from '@/components/wupload'

export default {
    components: {
        'w-login': Wlogin,
        'w-upload': Wupload
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
