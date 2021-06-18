const stripe = {
    namespaced = true,
    state: () => ({  
        payment_intent: {
            amount: 0,
            currency: "",
            email: "",
            name: "",

            locale: ""
        },
    }),
    mutations: {
                   payment_intent(state, value) {
                        state.payment_intent.amount = value.amount
                        state.payment_intent.currency = value.currency
                        state.payment_intent.email = value.email
                        state.payment_intent.name = value.name
                        state.payment_intent.payment_type = value.payment_type
                   }
               },
actions: {}
    

}
export default stripe
