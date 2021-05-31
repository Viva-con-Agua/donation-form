const payment = {
    namespaced: true,
    state: {
        paymentTypes: [
            { name: 'civisepa', title: 'payment.civisepa', default: true },
            { name: 'sepa', title: 'payment.sepa' },
            { name: 'creditcard', title: 'payment.creditcard' },
            { name: 'paypal', title: 'payment.paypal' }
        ],
        minAmount: 500,
        money: {
            amount: 3000,
            currency: 'EUR'
        }
    },
    mutations: {
        money(state, val) {
            state.money = val
        },
        interval(state, val) {
            state.interval = val
        }
    },
    getters: {
        money (state) {
            return state.money
        },
        interval(state) {
            return state.interval
        },
        minAmount(state) {
            return state.minAmount
        },
        paymentTypes(state) {
            return state.paymentTypes
        }
    }
}
export default payment