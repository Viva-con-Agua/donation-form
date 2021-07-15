import api from './api.js'
const stripe = {
    namespaced: true,
    state: () => ({  
        payment_intent: {
            status: "",
        }
    }),
    mutations: {
        create(state, value) {
            state.payment_intent = value
        },
        success(state) {
            state.payment_intent.status = "success"
        },
        error(state, value) {
            state.payment_intent.status = value
        }
    },
    actions: {
        payment_intent({rootState, commit}) {
            var data = {
                amount: rootState.payment.money.amount,
                currency: rootState.payment.money.currency,
                email: rootState.payment.contact.email,
                name: rootState.payment.contact.first_name + " " + rootState.payment.contact.last_name,
                locale: rootState.payment.contact.country[0].value,
                payment_type: rootState.transaction.payment_type
            }
            return new Promise((resolve, reject) => {
                api.call.post('/v1/donations/payment/intent', data)
                    .then((response) => {commit("create", response.data.payload), resolve(response)})
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        payment_intent_update({state}) {
            return new Promise((resolve, reject) => {
                api.call.put('/v1/donations/payment/intent', state.payment_intent)
                    .then((response) => {resolve(response)})
                    .catch((error) => {
                        reject(error)
                    })
            })

        },
        subscribe_intent({rootState}) {
            var data = {
                amount: rootState.payment.money.amount,
                currency: rootState.payment.money.currency,
                email: rootState.payment.contact.email,
                name: rootState.payment.contact.first_name + " " + rootState.payment.contact.last_name,
                interval: rootState.transaction.interval,
                locale: rootState.payment.contact.country[0].value,
                payment_type: rootState.transaction.payment_type
            }
            return new Promise((resolve, reject) => {
                api.call.post('/v1/donations/subscribe/intent', data)
                    .then((response) => {resolve(response)})
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        subscribe_success({rootState}, data) {
            var post = {
                amount: rootState.payment.money.amount,
                currency: rootState.payment.money.currency,
                email: rootState.payment.contact.email,
                name: rootState.payment.contact.first_name + " " + rootState.payment.contact.last_name,
                interval: rootState.transaction.interval,
                locale: rootState.payment.contact.country[0].value,
                payment_type: rootState.transaction.payment_type,
                product_id: rootState.campaign.current.product.stripe_id,
                payment_methode: data.data,
            }
            return new Promise((resolve, reject) => {
                api.call.post('/v1/donations/subscribe/success', post)
                    .then((response) => {resolve(response)})
                    .catch((error) => {
                        reject(error)
                    })
            })
        }

    }
}
export default stripe
