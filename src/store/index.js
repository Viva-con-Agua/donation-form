import Vue from 'vue'
import Vuex from 'vuex'
import anonymous from './anonymous.js'
import payment from './payment.js'
import transaction from './transaction.js'

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        user: anonymous,
        payment: payment,
        transaction: transaction
    },
    state: {
        loading: false,
        currentMsg: null,
        offset: {
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
        }
    },
    getters: {
        currentMsg (state) {
            return state.currentMsg
        },
        loadingFlow (state) {
            return state.loading
        },
        offset(state) {
            return state.offset
        },
        user(state) {
            return state.user
        },
        payment(state) {
            return state.payment
        }
    }
})
