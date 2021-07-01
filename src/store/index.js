import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import api from './api.js'
import anonymous from './anonymous.js'
import payment from './payment.js'
import transaction from './transaction.js'
import knownfrom from './knownfrom.js'
import campaign from './campaign.js'

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        anonymous: anonymous,
        payment: payment,
        knownfrom: knownfrom,
        transaction: transaction,
        campaign: campaign
    },
    state: {
        loading: false,
        currentMsg: null,
        product: 'prod_HZW4PLYJeuxnyC',
        crm_campaign_id: 148,
        crm_nl_profile: 22,
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
    },
    actions: {
        async init({dispatch}, data) {
            await dispatch({type: 'campaign/get', data: data.data})
        },
        feedback({state}, data) {
            console.log(data.data)
            let content = {}
            content['comment'] = data.data.comment ? data.data.comment : ''
            content['known_from'] = data.data.known_from ? data.data.known_from[0].title : ''

            console.log(content)
            console.log(state)
            return new Promise((resolve, reject) => {
                api.call.post('/v1/mailplupp', data.data)
                    .then(response => { resolve(response)})
                    .catch(error => { reject(error) })
            })
        },
        newsletter({state}) {
            let content = {}
            content['gid'] = state.crm_nl_profile
            content['email-Primary'] = state.anonymous.email
//            content['email-Primary'] = 'tk_testeroni3@vivaconagua.org'

            console.log(content)
            console.log(state)


            return new Promise((resolve, reject) => {

                axios.post('https://testcrm.vivaconagua.org/civicrm/profile/create?gid=22&reset=1', content)
                    .then(response => { resolve(response)})
                    .catch(error => { reject(error) })
            })
        }
    }
})
