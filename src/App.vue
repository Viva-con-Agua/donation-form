<template>
  <div id="app">
    <notifications position="top center" width="100%"/>
    <router-view class="app-content"/>
  </div>
</template>

<script>
import router from './router.js'
import store from './store'
import VueI18n from 'vue-i18n'
import de from '@/lang/de_DE.json';
import en from '@/lang/en_GB.json';
import getUserLocale from 'get-user-locale';
import vuecss from 'vca-ui/dist/vca-ui.css'
const   i18n = new VueI18n({
    locale: getUserLocale(),
    fallbackLocale: "de",
    messages: {
        'de': de,
        'de-DE': de,
        'de-CH': de,
        'ch': de,
        'en': en,
        'gb': en,
        'en-GB': en
    }
    });
export default {
    store,
    router,
    i18n, 
    vuecss,
    name: 'App',
    props: {
        campaign_id: {
            type: String,
            default: ""
        }
    },
    created() {
        this.$store.dispatch({type: 'init', data: this.campaign_id})
            .then(resp => console.log(resp))
            .catch(error => console.log(error))
    }
}
</script>
