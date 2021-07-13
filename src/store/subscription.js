
import api from './api.js'
const subscription = {
    namespaced: true,
    state: () => ({
        current: {
            status:"open",
            payment_method: ""
        }
    }),
    mutations: {
        create(state, value) {
            state.current = value
        },
        status(state, value) {
            state.current.status = value
        },
        payment_method(state, value) {
            state.current.payment_method = value
        }
    },
    actions:{
        create({rootState, commit}) {
           var country = rootState.payment.contact.country[0].value
            var data = {
                money: rootState.payment.money,
                contact: rootState.payment.contact,
                payment_type: rootState.payment.payment_type,
                interval: rootState.transaction.interval,
                product_id: rootState.campaign.current.product.stripe_id,
                campaign_id: rootState.campaign.current.id
            }
            data.contact.country = country
            return new Promise((resolve, reject) => {
                api.call.post('/v1/donations/subscribe', data)
                    .then((response) => {commit("create", response.data.payload),resolve(response)})
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        success({state, commit}) {
            return new Promise((resolve, reject) => {
                api.call.put('/v1/donations/subscribe', state.current)
                    .then((response) => {commit("create", response.data.payload), resolve(response)})
                    .catch((error) => {
                        reject(error)
                    })
            })
        }
    }
}
export default subscription

