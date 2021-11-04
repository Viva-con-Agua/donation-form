import api from './api.js'

const organisation = {
    namespaced: true,
    state: () => ({
        current: {
            paypal_key: process.env.VUE_APP_PAYPAL_CLIENT_ID,
            stripe_key: process.env.VUE_APP_STRIPE_PUBLIC_KEY
        },
        examples: {
                'de': [
                  {'value': 8000, 'message': 'example.workshop'},
                  {'value': 5000, 'message': 'example.trees'},
                  {'value': 2000, 'message': 'example.filter'},
                  {'value': 1500, 'message': 'example.soap'}
                ],
                'at': [
                  {'value': 25000, 'message':'example.workshop'},
                  {'value': 10000, 'message':'example.trees'},
                  {'value': 5000, 'message': 'example.filter'},
                  {'value': 1000, 'message': 'example.soap'}
                ]
            }
    }),
    getters: {
        examples(state) {
            return (state.examples[localStorage.language]) ? state.examples[localStorage.language] : state.examples['de']
        },
        settings() {
            return localStorage.language
        },
        current(state) {
            return state.current
        }
    },
    mutations: {
        current(state, value) {
            state.current =  { 
                'paypal_key': process.env.VUE_APP_PAYPAL_CLIENT_ID,
                'stripe_key': process.env.VUE_APP_STRIPE_PUBLIC_KEY,
                'value': value
            }
        }
    },
    actions: {
        get({commit}, data) {
            return new Promise((resolve, reject) => {
                api.call.get('/v1/organisation/' + data.data)
                    .then((response) => {
                        commit('current', response.data.payload), resolve()
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        }
    }
}

export default organisation
