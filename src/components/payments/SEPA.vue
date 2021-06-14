<template>
    <div class="stripe-payment-container">
        <vca-field :label="$t('payment.more_details')">
            <div class="vca-input-border vca-input"><div ref="element" label="IBAN" class="stripe-payment"></div></div>
            <vca-checkbox
                :rules="$v.terms"
                ref="terms"
                v-model="terms"
                :errorMsg="$t('payment.terms.sepa.error')">
                        <div v-html="$t('payment.terms.sepa.de.single')"></div>
            </vca-checkbox>
        </vca-field>
    </div>
</template>

<script>

import axios from 'axios'

import { mapGetters } from 'vuex'
export default {
    name: 'SEPA',
    props: ['product'],
    data() {
        return {
            stripe: null,
            elements: null,
            element: null,
            ibanInvalid: true,
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
                },
                supportedCountries: ['SEPA'],
                // Elements can use a placeholder as an example IBAN that reflects
                // the IBAN format of your customer's country. If you know your
                // customer's country, we recommend passing it to the Element as the
                // placeholderCountry.
                placeholderCountry: this.$i18n.locale,
            }
        }
    },
    mounted () {
        this.element.mount(this.$refs.element)
    },
    created() {
        this.$store.commit('transaction/payment_type', 'sepa')
        this.$store.commit('transaction/provider', 'stripe')
        this.stripe = window.Stripe(process.env.VUE_APP_STRIPE_PUBLIC_KEY)
        this.elements = this.stripe.elements()
        this.element = this.elements.create('iban', this.options)
        this.element.on('change', (event) => { 
            if (!event.complete) {
                this.ibanInvalid = true
            } else {
                this.ibanInvalid = false
            }
            this.$emit('isInvalid', this.isInvalid)
        })

        this.$emit('isInvalid', this.isInvalid)
    },
    validations() {
        return {
            terms: {
                watcher: value => value === true
            }
        }
    },
    computed: {
        isInvalid() {
            return this.$v.$invalid || this.ibanInvalid
        },
        terms: {
            get () {
                return this.$store.state.transaction.terms
            },
            set(value) {
                this.$store.commit('transaction/terms', value)
                this.$refs.terms.validate()
                this.$emit('isInvalid', this.isInvalid)
            }
        },
        ...mapGetters({
           anonymous: 'anonymous',
           payment: 'payment',
           transaction: 'transaction'
        })
    },
    methods: {
        stripeRequestIBAN (client_secret) {
            this.stripe.confirmSepaDebitPayment(client_secret, {
                payment_method: {
                    sepa_debit: this.element,
                    billing_details: {
                        name: this.anonymous.first_name + ' ' + this.anonymous.last_name,
                        email: this.anonymous.email
                    }
                }}).then(result => {
                    if (result.error) {
                        // Show error to your customer (e.g., insufficient funds)
                        console.log(result.error.message);
                    } else {
                        // The payment is state processing!
                        if (result.paymentIntent.status === 'processing') {
                            this.transaction.id = result.paymentIntent.id
                            this.$emit('success', this.payment)
                        }
                    }
                });
        },
        purchase () {
            if (!this.isInvalid) {
                axios.post(process.env.VUE_APP_BACKEND_URL + '/v1/payment/iban', {
                    amount: this.payment.money.amount,
                    name: this.anonymous.first_name + ' ' + this.anonymous.last_name,
                    email: this.anonymous.email,
                    currency: this.payment.money.currency,
                    locale: this.anonymous.country
                }).then(response => (
                    console.log(response),
                    this.stripeRequestIBAN(response.data.client_secret)
                ))
            }
        }
    }


}
</script>
