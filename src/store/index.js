import Vue from 'vue'
import Vuex from 'vuex'
import anonymous from './anonymous.js'
import payment from './payment.js'
import transaction from './transaction.js'
import knownfrom from './knownfrom.js'
import api from './api.js'

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        anonymous: anonymous,
        payment: payment,
        knownfrom: knownfrom,
        transaction: transaction
    },
    state: {
        campaign: null,
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
        init(state, value) {
            state.campaign = value
        }, 
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
        }
    },
    actions: {
        init({commit}, data) {
            return new Promise((resolve, reject) => {
                api.call.get('/v1/donations/campaign/' + data.data)
                    .then((response) => {commit('init', response.data.payload), resolve()})
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        logout({commit}) {
            //dispatch('user/signout')
            commit('user/session/logout')  
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
