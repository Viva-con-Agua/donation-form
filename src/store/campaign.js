import api from './api.js'

const campaign = {
    namespaced: true,
    state: () => ({
        current: {
            product: null,
        }
    }),
    getters: {
        product(state) {
            return state.current.product
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
