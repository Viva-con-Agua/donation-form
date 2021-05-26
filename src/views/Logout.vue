<template>
    <div></div>
</template>
<script>
export default {
    name: 'Logout',
    props: {
        code: {
            type: String,
            default: null
        }
    },
    created () {
        this.$store.dispatch("logout")
    }
}
</script>
