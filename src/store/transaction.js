const transaction = {
    namespaced: true,
    state: {
        id: null,
        provider: null,
        abo: false,
        interval: 'monthly',
        payment_type: null,
        account: {}
    },
    mutations: {
        abo(state, val) {
            state.abo = val
        }
    },
    getters: {
        abo(state) {
            return state.abo
        }
    }
}
export default transaction