import api from './api.js'

const campaign = {
    namespaced: true,
    state: () => ({
        current: {
            product: null,
            min_amount: 100,
            payment_types: [
                { name: 'civisepa', title: 'payment.type.sepa', default: true },
                { name: 'sepa', title: 'payment.type.sepa' },
                { name: 'creditcard', title: 'payment.type.creditcard' },
                { name: 'paypal', title: 'payment.type.paypal' }
            ],
        }
    }),
    getters: {
        product(state) {
            return state.current.product
        },
        minAmount(state) {
            return state.current.min_amount
        },
        paymentTypes(state) {
            return state.current.payment_types
        }
    },
    mutations: {
        get(state, value) {
            state.current = value
        }
    },
    actions: {
        get({commit}, data) {
            return new Promise((resolve, reject) => {
                api.call.get('/v1/donations/campaign/' + data.data)
                    .then((response) => {commit('get', response.data.payload), resolve()})
                    .catch((error) => {
                        reject(error)
                    })
            })
        }
    },
}

export default campaign
