
import api from './api.js'
const intent = {
    namespaced: true,
    state: () => ({
        current: {
            status:"open"
        }
    }),
    mutations: {
        create(state, value) {
            state.current = value
        },
        status(state, value) {
            state.current.status = value
        }
    },
    actions: {
        create({rootState, commit}) {
            var country = rootState.payment.contact.country[0].value
            var data = {
                money: rootState.payment.money,
                contact: rootState.payment.contact,
                payment_type: rootState.payment.payment_type,
                campaign_id: rootState.campaign.current.id
            }
            data.contact.country = country
            return new Promise((resolve, reject) => {
                api.call.post('/v1/donations/payment/intent', data)
                    .then((response) => {commit("create", response.data.payload), resolve(response)})
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        update({state}) {
            return new Promise((resolve, reject) => {
                api.call.put('/v1/donations/payment/intent', state.current)
                    .then((response) => {resolve(response)})
                    .catch((error) => {
                        reject(error)
                    })
            })
        }
    }
}
export default intent
