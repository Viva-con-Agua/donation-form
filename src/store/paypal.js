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
        current: null

    }),
    getters: {
        current(state) {
           return state.current
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
                name: rootState.campaign.name,
                description: rootState.campaign.description,
                interval: rootState.transaction.interval,
                amount: Money.getPayPalString(rootState.payment.money.amount),
                currency: rootState.payment.money.currency,
                product_id: rootState.campaign.current.product.paypal_id
            }
            return new Promise((resolve, reject) => {
                api.call.post('/donations/subscribe/paypal', data)
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
