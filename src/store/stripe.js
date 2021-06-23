import api from './api.js'
const stripe = {
    namespaced: true,
    state: () => ({  
        payment_intent: {
            amount: 0,
            currency: "",
            email: "",
            name: "",
            locale: "",
            payment_type: ""
        },
    }),
    mutations: {
        payment_intent(state, value) {
            state.payment_intent.amount = value.amount
            state.payment_intent.currency = value.currency
            state.payment_intent.email = value.email
            state.payment_intent.name = value.name
            state.payment_intent.payment_type = value.payment_type
        }
    },
    actions: {
        payment_intent({rootState}) {
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
                product_id: rootState.campaign.current.product.paypal_id,
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
