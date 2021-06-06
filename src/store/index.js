import Vue from 'vue'
import Vuex from 'vuex'
import anonymous from './anonymous.js'
import payment from './payment.js'
import transaction from './transaction.js'
import knownfrom from './knownfrom.js'

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        anonymous: anonymous,
        payment: payment,
        knownfrom: knownfrom,
        transaction: transaction
    },
    state: {
        loading: false,
        currentMsg: null,
        product: 'prod_HZW4PLYJeuxnyC',
        crm_campaign_id: 148,
        offset: {
            company: false,
            known_from: null,
            comment: null,
        }
    },
    mutations: {
        currentMsg (state, value) {
            state.currentMsg = value
        },
        loadingFlow(state) {
            state.loading = !state.loading
        },
        offset(state, value) {
            state.offset = value
        },
        anonymous(state, value) {
            state.anonymous = value
        },
    },
    getters: {
        currentMsg (state) {
            return state.currentMsg
        },
        knownfrom (state) {
            return state.knownfrom
        },
        loadingFlow (state) {
            return state.loading
        },
        offset(state) {
            return state.offset
        },
        anonymous(state) {
            return state.anonymous
        },
        payment(state) {
            return state.payment
        }
    }
})
