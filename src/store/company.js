const company = {
    namespaced: true,
    state: () => ({
        current: {
            paypal_client_id: "",
            stripe_public_key: "",
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
            if (value.company) {
                state.current = value.company
            }
        }
    }
}

export default company
