import stripe from './stripe.js'
const payment = {
    namespaced: true,
    modules: {
        stripe: stripe
    },
    state: {
        paymentTypes: [
            { name: 'civisepa', title: 'payment.type.sepa', default: true },
            { name: 'sepa', title: 'payment.type.sepa' },
            { name: 'creditcard', title: 'payment.type.creditcard' },
            { name: 'paypal', title: 'payment.type.paypal' }
        ],
        minAmount: 500,
        money: {
            amount: 3000,
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
        minAmount(state) {
            return state.minAmount
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
