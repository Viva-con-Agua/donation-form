import api from './api.js'
import Money from 'vca-ui/src/utils/Money'

const paypal = {

namespaced: true,
    state: () => ({
        subscription: {
            name: 'VcA Membership',
            description: 'VcA Membership PayPal subscription',
            interval: '',
            amount: '',
            currency: '',
            product_id: ''
        },
        current: {
            plan_id: null
        }

    }),
    getters: {
        current(state) {
           return state.current
        },
        plan_id(state) {
            return state.current.plan_id
        }
    },
    mutations: {
        product(state, value) {
            state.subscription.product_id = value
        },
        current(state, value) {
            state.current = value
        }
    },
    actions: {
        billing_plan({rootState, commit}) {
            var data = {
                name: rootState.campaign.current.name,
                description: rootState.campaign.current.description,
                interval: rootState.transaction.interval,
                amount: Money.getPayPalString(rootState.payment.money.amount),
                currency: rootState.payment.money.currency,
                product_id: rootState.campaign.current.product.paypal_id
            }
            return new Promise((resolve, reject) => {
                api.call.post('/v1/donations/subscribe/paypal', data)
                    .then((response) => {
                        commit('current', response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    }
}
export default paypal
