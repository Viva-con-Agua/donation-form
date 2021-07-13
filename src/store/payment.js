import stripe from './stripe.js'
import paypal from './paypal.js'
import intent from './intent.js'
import subscription from './subscription.js'
const payment = {
    namespaced: true,
    modules: {
        stripe: stripe,
        paypal: paypal,
        intent: intent,
        subscription: subscription
    },
    state: {
        money: {
            amount: 500,
            currency: 'EUR'
        },
        contact: {
            email: "",
            first_name: "",
            last_name: "",
            street: "",
            number: "",
            zip: "",
            city: "",
            country: [],
            company_name:""
        },
        payment_type: ""
    },
    mutations: {
        money(state, val) {
            console.log(val)
            state.money = val
        },
        interval(state, val) {
            state.interval = val
        },
        payment_type(state, val) {
            state.payment_type = val
        },
        contact(state, val) {
            state.contact = val
        }
        
    },
    getters: {
        money (state) {
            return state.money
        },
        interval(state) {
            return state.interval
        },
        paymentTypes(state) {
            return state.paymentTypes
        },
        contact(state) {
            return state.contact
        }
    }
}
export default payment
