<template>
    <div class="stripe-payment-container">
        <vca-field :label="$t('payment.more_details')">
            <div class="vca-input-border vca-input"><div ref="element" label="IBAN" class="stripe-payment"></div></div>
            <vca-checkbox
                :rules="$v.terms"
                ref="terms"
                v-model="terms"
                :errorMsg="$t('payment.terms.sepa.error')">
                        <div v-if="setting == 'mtg'" v-html="$t('payment.terms.sepa.mtg.single')"></div>
                        <div v-else v-html="$t('payment.terms.sepa.de.single')"></div>
            </vca-checkbox>
        </vca-field>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'StripeSubscriptionSepa',
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
        this.stripe = window.Stripe(this.company.stripe_public_key)
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
        anonymous: {
            get () {
                return this.$store.state.payment.contact
            }
        },
        terms: {
            get () {
               return this.$store.state.payment.stripe.terms
            },
            set(value) {
                this.$store.commit('payment/stripe/terms', value)
                this.$refs.terms.validate()
                this.$emit('isInvalid', this.isInvalid)
            }
        },
        ...mapGetters({
            billing_details: 'payment/stripe/billing_details',
            company: 'form/company',
            setting: 'setting'
        })
    },
    watch: {
        anonymous: {
            handler(val) {
                this.$store.commit('payment/contact', val)
                this.$emit('isInvalid', this.isInvalid)
            },
            deep: true
        }
    },
    methods: {
        stripeRequestIBAN(client_secret) {
            this.stripe.confirmSepaDebitSetup(client_secret, {
                payment_method: {
                    sepa_debit: this.element,
                    billing_details: this.billing_details
                }
            }).then(result => {
                this.result(result)
            });
        },
        purchase () {
            if (!this.isInvalid) {
                this.$store.dispatch('payment/stripe/setup_intent_create')
                    .then(response => (
                    this.stripeRequestIBAN(response.data.payload.setup_intent.client_secret)
                    ))
                    .catch(error => {
                        console.log(error)
                    })
            } else {
                console.log("isInvalid == true")
            }
        },
        result(result) {
            if (result.error) {
                this.$store.commit("payment/stripe/status", result.error.message)
                this.$store.dispatch("payment/stripe/setup_intent_finish")
                        .then(()=>{this.$emit('error', result.error)})
                        .catch((err) => {console.log(err), this.$emit("error", err)})
            } else {
                // The payment has been processed!
                if (result.setupIntent.status === 'succeeded') {
                    this.$store.commit("payment/stripe/status", "done")
                    this.$store.commit("payment/stripe/payment_method", result.setupIntent.payment_method)
                    this.$store.dispatch("payment/stripe/setup_intent_finish")
                        .then(()=>{this.$emit('success')})
                        .catch((err) => { this.$emit("error", err)})
                }
            }
        }
    }
}
</script>
