const payment = {
    namespaced: true,
    state: {
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
        }
    }
}
export default payment