const transaction = {
    namespaced: true,
    state: {
        id: null,
        provider: null,
        abo: false,
        interval: 'monthly',
        payment_type: null,
        terms: false,
        account: {
            iban: null,
            bic: null
        }
    },
    mutations: {
        abo(state, val) {
            state.abo = val
        },
        payment_type(state, val) {
            state.payment_type = val
        },
        provider(state, val) {
            state.provider = val
        },
        terms(state, val) {
            state.terms = val
        },
        iban(state, val) {
            state.account.iban = val
        },
        bic(state, val) {
            state.account.bic = val
        },
        id(state, val) {
            state.id = val
        }
    },
    getters: {
        abo(state) {
            return state.abo
        },
        payment_type(state) {
            return state.payment_type
        },
        terms(state) {
            return state.terms
        },
        iban(state) {
            return state.account.iban
        }
    }
}
export default transaction
