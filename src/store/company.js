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
                  {'value': 10000, 'message':'example.10kid'},
                  {'value': 9000, 'message':'example.9kid'},
                  {'value': 8000, 'message':'example.8kid'},
                  {'value': 7000, 'message':'example.7kid'},
                  {'value': 6000, 'message':'example.6kid'},
                  {'value': 5000, 'message':'example.5kid'},
                  {'value': 4000, 'message': 'example.4kid'},
                  {'value': 3000, 'message': 'example.3kid'},
                  {'value': 2000, 'message': 'example.2kid'},
                  {'value': 1000, 'message': 'example.1kid'}
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
