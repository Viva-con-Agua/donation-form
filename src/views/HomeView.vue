<template>
    <div class="content-text">
        <Home />
    </div>
</template>

<script>
import Home from '@/components/landing/Home.vue'
export default {
    name: 'HomeView',
    components: { Home },
    created() {
        this.$store.dispatch('homeView')
    }
}
</script>