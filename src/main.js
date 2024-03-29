import Vue from 'vue'
import Notifications from 'vue-notification'
import VcaUi from 'vca-ui'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router.js'
import store from './store'
import getUserLocale from 'get-user-locale';
import VueI18n from 'vue-i18n'
import FlagIcon from 'vue-flag-icon'
import VueObserveVisibility from 'vue-observe-visibility'
import 'vca-ui/dist/vca-ui.css'

//import wrap from '@vue/web-component-wrapper';
import de from '@/lang/de_DE.json';
import en from '@/lang/en_GB.json';
import at from '@/lang/de_AT.json';


Vue.use(Notifications)
Vue.use(VcaUi)
Vue.use(VueI18n)
Vue.use(Vuelidate)
Vue.use(FlagIcon)
Vue.use(VueObserveVisibility)
Vue.config.productionTip = false


//const locale =  navigator.language;
const i18n = new VueI18n({
    locale: getUserLocale(),
    fallbackLocale: "de",
    messages: {
        'de': de,
        'de-DE': de,
        'de-CH': de,
        'ch': de,
        'at': at,
        'de-AT': at,
        'en': en,
        'gb': en,
        'en-GB': en
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
    toLocaleString: function (str) {
        return str.toLocaleString(this.$i18n.locale)
    },
    formatDate(val) {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(val * 1000).toLocaleDateString(this.$i18n.locale, options)
    },
    gtmTrack (action, label, value) {
        var event = {
        event: "gtm-trigger",
        data: {
            event: "gtm-trigger-" + action,
            target: "DonationForm",
            action: action,
            label: label,
            value: value
            }
        }
        window.top.postMessage(event, "*")
        if (process.env.VUE_APP_MODE === "debug") {
            console.log("gtm-event: ",event)
        }
    },
    trackingTrigger(data) {
        var event = {
            event: "gtm-trigger",
            data: data
        }
        window.top.postMessage(event, "*")
        if (process.env.VUE_APP_MODE === "debug") {
            console.log("tracking-event: ", event)
        }
    }
}
})

//const CustomElement = wrap(Vue, App);

//window.customElements.define('donation-form', CustomElement);

new Vue({
    i18n,
    store,
    router,
    render: h => h(App),
}).$mount('#app')
