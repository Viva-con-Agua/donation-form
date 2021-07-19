import stripe from './stripe.js'
import paypal from './paypal.js'
//import intent from './intent.js'
//import subscription from './subscription.js'
import api from '../api.js'
const payment = {
    namespaced: true,
    modules: {
        stripe: stripe,
        paypal: paypal,
        //intent: intent,
        //subscription: subscription
    },
    state: {
        payment_id: null,
        money: {
            amount: 500,
            currency: 'EUR'
        },
        contact: {
            email: "",
            first_name: "",
            last_name: "",
            street: "",
            number: "",
            zip: "",
            city: "",
            country: "",
            company_name:""
        },
        payment_type: "",
        country: [],
    },
    mutations: {
        create(state, val) {
            state.payment_id = val.id  
        },
        money(state, val) {
            console.log(val)
            state.money = val
        },
        interval(state, val) {
            state.interval = val
        },
        payment_type(state, val) {
            state.payment_type = val
        },
        contact(state, val) {
            state.contact = val
        },
        country(state, val) {
            state.country = val
        }



    },
    getters: {
        money (state) {
            return state.money
        },
        interval(state) {
            return state.interval
        },
        paymentTypes(state) {
            return state.paymentTypes
        },
        contact(state) {
            return state.contact
        }
    },
    actions: {
        
        async process({dispatch, state}) {
            if (state.payment_id != null) {
                await dispatch("update")
            } else {
                await dispatch("create")
            }
        },
        create({rootState, state, commit}) {
            var country = state.country[0].value
            var data = {
                money: state.money,
                contact: state.contact,
                campaign_id: rootState.campaign.current.id
            }
            data.contact.country = country
            return new Promise((resolve, reject) => {
                api.call.post('/v1/donations/payment', data)
                    .then((response) => {commit("create", response.data.payload), resolve()})
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        update({rootState, state}) {
            var country = state.country[0].value
            var data = {
                id: state.payment_id,
                money: state.money,
                contact: state.contact,
                campaign_id: rootState.campaign.current.id
            }
            data.contact.country = country
            return new Promise((resolve, reject) => {
                api.call.put('/v1/donations/payment', data)
                    .then((response) => {console.log(response), resolve()})
                    .catch((error) => {
                        reject(error)
                    })
            })
        }
    }
}
export default payment
