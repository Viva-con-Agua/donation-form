import Vue from 'vue'
import Notifications from 'vue-notification'
import VcaUi from 'vca-ui'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router.js'
import store from './store'
import VueI18n from 'vue-i18n'
import FlagIcon from 'vue-flag-icon'
import 'vca-ui/dist/vca-ui.css'

import de from '@/lang/de_DE.json';

Vue.use(Notifications)
Vue.use(VcaUi)
Vue.use(VueI18n)
Vue.use(Vuelidate)
Vue.use(FlagIcon)
Vue.config.productionTip = false


//const locale =  navigator.language;
const i18n = new VueI18n({
    locale: navigator.language,
    fallbackLocale: "de",
    messages: {
        'de-DE': de,
        'de': de
    }
});

Vue.mixin({
  methods: {
    notification: function (msg) {
        if (msg !== undefined) {
            this.$notify({
                title: this.$t(msg.title),
                text: this.$t(msg.body),
                type: msg.type,
                duration: 6000
            });
        }
    },    
    formatDate(val) {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(val * 1000).toLocaleDateString(this.$i18n.locale, options)
    }
  },
})


new Vue({
    i18n,
    router,
    store: store,
    render: h => h(App),
}).$mount('#app')
