import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import api from './api.js'
import payment from './payment'
import knownfrom from './knownfrom.js'
import form from './form.js'

Vue.use(Vuex)
export default new Vuex.Store({
    namespaced: true,
    modules: {
        payment: payment,
        knownfrom: knownfrom,
        form: form
    },
    state: {
        loading: false,
        currentMsg: null,
        product: 'prod_HZW4PLYJeuxnyC',
        crm_campaign_id: 148,
        crm_nl_profile: 22,
        company: false,
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
        },
        anonymous(state, value) {
            state.anonymous = value
        },
        company(state, value) {
            state.company = value
        }
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
        company(state) {
            return state.company
        },
        payment(state) {
            return state.payment
        }
    },
    actions: {
        async init({dispatch}, data) {
            await dispatch({type: 'form/get', data: data.data})
        },
        feedback({state}) {

            let data = {
                'first_name': state.payment.contact.first_name ? state.payment.contact.first_name : '',
                'last_name': state.payment.contact.last_name ? state.payment.contact.last_name : '',
                'email': state.payment.contact.email ? state.payment.contact.email : 't.kaestle@vivaconagua.org',
                'message': state.offset.comment ? state.offset.comment : 'Jupp das ist das neue Testformular',
                'known_from': state.offset.known_from ? state.offset.known_from[0].title : 'Dragonball Folge 216 Minute 13'
            }

            return new Promise((resolve, reject) => {
                api.call.post('/v1/email/contact', data)
                    .then(response => { resolve(response)})
                    .catch(error => { reject(error) })
            })
        },
        newsletter({state}) {
            let content = {}
            content['gid'] = state.crm_nl_profile
            content['email-Primary'] = state.anonymous.email
            content['email-Primary'] = 'tk_testeroni3@vivaconagua.org'

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
