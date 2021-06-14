<template>
    <vca-field :label="$t('payment.more_details')">
        <div class="stripe-payment-container">
            <div class="vca-input-border"><div ref="card" class="stripe-payment"></div></div>
        </div>
    </vca-field>
</template>

<script>
import axios from 'axios'

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
           anonymous: 'anonymous',
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
                        name: this.anonymous.first_name + ' ' + this.anonymous.last_name,
                        email: this.anonymous.email
                    }
                }
            }).then(result => {
                if (result.error) {
                    // Show error to your customer (e.g., insufficient funds)
                    console.log(result.error.message);
                } else {
                    // The payment has been processed!
                    if (result.setupIntent.status === 'succeeded') {
                        axios.post(process.env.VUE_APP_BACKEND_URL + '/v1/payment/subscription', { 
                            amount: this.payment.money.amount,
                            currency: this.payment.money.currency,
                            name: this.anonymous.first_name + ' ' + this.anonymous.last_name,
                            email: this.anonymous.email,
                            interval: this.transaction.interval,
                            locale: this.$i18n.locale,
                            type: 'card',
                            product: this.product
                        }).then(response => {
                            this.transaction.id = response.data.id,
                            this.$emit('success', this.transaction)
                        })
                    }
                }
            });
        },
        purchase () {
            if (!this.isInvalid) {
                axios.post(process.env.VUE_APP_BACKEND_URL + '/v1/payment/default', { 
                    amount: this.payment.money.amount,
                    name: this.anonymous.first_name + ' ' + this.anonymous.last_name,
                    email: this.anonymous.email,
                    interval: this.transaction.interval,
                    currency: this.payment.money.currency,
                    locale: this.$i18n.locale,
                    type: 'card'
                }).then(response => (
                    this.stripeRequestCard(response.data.client_secret)
                ))
            }
        }
    }


}
</script>
