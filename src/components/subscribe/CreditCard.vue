<template>
    <vca-field :label="$t('payment.more_details')">
        <div class="stripe-payment-container">
            <div class="vca-input-border"><div ref="card" class="stripe-payment"></div></div>
        </div>
    </vca-field>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
    name: 'CreditCard',
    props: ['product'],
    data() {
        return {
            stripe: null,
            elements: null,
            element: null,
            cardInvalid: true,
            options: {
                style: {
                    base: {
                        color: '#32325d',
                        '::placeholder': {
                            color: '#aab7c4'
                        },
                        ':-webkit-autofill': {
                            color: '#32325d',
                        },
                    },
                    invalid: {
                        color: '#ff5522',
                        iconColor: '#ff5522',
                        ':-webkit-autofill': {
                            color: '#ff5522',
                        },
                    },
                    empty: {
                        color: '#0a6b91',
                        iconColor: '#0a6b91',
                        ':-webkit-autofill': {
                            color: '#0a6b91',
                        },
                    },
                }
            }
        }
    },
    mounted () {
        this.element.mount(this.$refs.card)
    },
    created() {
        this.$store.commit('transaction/payment_type', 'creditcard')
        this.$store.commit('transaction/provider', 'stripe')
        this.stripe = window.Stripe(process.env.VUE_APP_STRIPE_PUBLIC_KEY)
        this.elements = this.stripe.elements()
        this.element = this.elements.create('card', this.options)

        this.element.on('change', (event) => { 
            if (!event.complete) {
                this.cardInvalid = true
            } else {
                this.cardInvalid = false
            }
            this.$emit('isInvalid', this.isInvalid)
        })

        this.$emit('isInvalid', this.isInvalid)
    },
    computed: {
        isInvalid() {
            return this.cardInvalid
        },
        ...mapGetters({
            contact: 'payment/contact',
           payment: 'payment',
           transaction: 'transaction'
        })
    },
    methods: {
        stripeRequestCard(client_secret) {
            this.stripe.confirmCardSetup(client_secret, {
                payment_method: {
                    card: this.element,
                    billing_details: {
                        name: this.contact.first_name + ' ' + this.contact.last_name,
                        email: this.contact.email
                    }
                }
            }).then(result => {
                if (result.error) {
                    // Show error to your customer (e.g., insufficient funds)
                    console.log(result.error.message);
                } else {
                    // The payment has been processed!
                    if (result.setupIntent.status === 'succeeded') {
                        this.$store.dispatch({type: "payment/stripe/subscribe_success", data:result.payment_method})
                            .then(response => {
                            this.$store.commit("transaction/id", response.paymentIntent.id)
                            this.$emit('success')
                        })
                    }
                }
            });
        },
         purchase () {
            if (!this.isInvalid) {
                console.log("purchase")
                this.$store.dispatch('payment/stripe/subscribe_intent')
                    .then(response => (
                        this.stripeRequestCard(response.data.payload.client_secret)
                    ))
                    .catch(error => {
                        console.log(error)
                    })
            } else {
                console.log("isInvalid == true")
            }
        }
    }


}
</script>
