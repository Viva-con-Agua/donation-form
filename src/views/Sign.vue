<template>
    <div class="text-center">
        <h1>{{ $t('login.redirect') }}</h1>
    </div>
</template>
<script>
export default {
    name: 'SignView',
    props: {
        callback: {
            type: String,
            default: null
        }
    },
    created () {
        if (this.callback == null) {
            window.location = process.env.VUE_APP_AUTH_URL + "login?scope=" + process.env.VUE_APP_SCOPE + "&language=" + localStorage.language
        } else {
            window.location = process.env.VUE_APP_AUTH_URL + "login?scope=" + process.env.VUE_APP_SCOPE + "&language=" + localStorage.language + "&callback=" + this.callback
        }
    }
}
</script>