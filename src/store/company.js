const company = {
    namespaced: true,
    state: () => ({
        current: {
            paypal_client_id: "",
            stripe_public_key: "",
        },
        examples: {
                'de': [
                  {'value': 8000, 'message': 'example.8000'},
                  {'value': 5000, 'message': 'example.5000'},
                  {'value': 2000, 'message': 'example.2000'},
                  {'value': 1500, 'message': 'example.1500'}
                ],
                'at': [
                  {'value': 100000, 'message': 'example.100000'},
                  {'value': 50000, 'message': 'example.50000'},
                  {'value': 35000, 'message': 'example.35000'},
                  {'value': 25000, 'message': 'example.25000'},
                  {'value': 15000, 'message': 'example.15000'},
                  {'value': 10000, 'message': 'example.10000'},
                  {'value': 9000, 'message': 'example.9000'},
                  {'value': 8000, 'message': 'example.8000'},
                  {'value': 7000, 'message': 'example.7000'},
                  {'value': 6000, 'message': 'example.6000'},
                  {'value': 5000, 'message': 'example.5000'},
                  {'value': 4000, 'message': 'example.4000'},
                  {'value': 3000, 'message': 'example.3000'},
                  {'value': 2000, 'message': 'example.2000'},
                  {'value': 1000, 'message': 'example.1000'}
                ],
                'mtg': [
                  {'value': 15000, 'message': 'example.mtg.15000'},
                  {'value': 5000, 'message': 'example.mtg.5000'},
                  {'value': 2500, 'message': 'example.mtg.2500'},
                  {'value': 500, 'message': 'example.mtg.500'},
                  {'value': 100, 'message': 'example.mtg.100'}
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
