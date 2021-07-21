<template>
    <div class="stripe-payment-container">
        <vca-field :label="$t('payment.more_details')">
            <div class="vca-center" v-if="showEmail">
                <div class="vca-row quarter">
                    <vca-input
                        ref="email"
                        :errorMsg="$t('contactform.email.error')"
                        @input="lower"
                        :placeholder="$t('contactform.email.placeholder')"
                        v-model.trim="anonymous.email" 
                        :rules="$v.anonymous.email">
                    </vca-input>
                    <div class="inline-infobox"><vca-info-box>{{ $t('payment.email') }}</vca-info-box></div>
                </div>
            </div>
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
import { required, email} from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
export default {
    name: 'StripeSubscriptionSepa',
    props: ['product'],
    data() {
        return {
            showEmail: false,
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
        this.showEmail = !this.anonymous.email
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
            },
            anonymous: {
                email: {
                    email,
                    required
                }
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
            billing_details: 'payment/stripe/billing_details'
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
        lower() {
            this.anonymous.email = this.anonymous.email.toLowerCase()
        },
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
                this.$store.dispatch("payment/stripe/setup_intent_finish").catch(err => {console.log(err)})
                this.$emit("failed")
            } else {
                // The payment has been processed!
                if (result.paymentIntent.status === 'succeeded') {
                    this.$store.commit("payment/stripe/status", "done")
                    this.$store.dispatch("payment/stripe/setup_intent_finish").catch(err => {console.log(err)})
                    this.$emit('success')
                }
            }
        }
    }


}
</script>
