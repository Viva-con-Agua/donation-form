<template>
    <div class="stripe-payment-container">
        <div class="vca-input-border"><div ref="element" label="IBAN" class="stripe-payment"></div></div>

        <vca-field  v-if="isDE" :label="$t('payments.sepa.label_further')">
            <vca-checkbox
                :rules="$v.accept"
                ref="accept"
                v-model="accept"
                :errorMsg="$t('payments.sepa.errorMsg')">
                <span v-html="$t('payments.sepa.legal')"></span>
            </vca-checkbox>
        </vca-field>
        <button type="button" v-on:click.prevent="purchase" class="stripe-donation-button"> {{ label }} </button>
    </div>
</template>

<script>

import axios from 'axios'
import { mapGetters } from 'vuex'
const style = {
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
        color: '#dc3545',
        iconColor: '#dc3545',
        ':-webkit-autofill': {
            color: '#dc3545',
        },
    },
    empty: {
        color: '#0a6b91',
        iconColor: '#0a6b91',
        ':-webkit-autofill': {
            color: '#0a6b91',
        },
    },
};
const options = {
    style,
    supportedCountries: ['SEPA'],
    // Elements can use a placeholder as an example IBAN that reflects
    // the IBAN format of your customer's country. If you know your
    // customer's country, we recommend passing it to the Element as the
    // placeholderCountry.
    placeholderCountry: 'DE',
};
let stripe = window.Stripe(process.env.VUE_APP_STRIPE_PUBLIC_KEY),
    elements = stripe.elements(),
    element = elements.create('iban', options)

export default {
    name: 'SEPA',
    props: ['payment', 'valid', 'label', 'country'],
    data() {
        return {
            accept: false,
            localPayment: this.payment
        }
    },
    mounted () {
        element.mount(this.$refs.element)
    },
    validations() {
        return {
            accept: {
                watcher: value => value === true
            }
        }
    },
    computed: {
        ...mapGetters({
            profile: 'user/profile/current',
            user: 'user/current',
            anonymous: 'user/anonymous',
        }),
        isCH() {
            return this.country == 'CH'
        },
        isAT() {
            return this.country == 'AT'
        },
        isDE() {
            return this.country == 'DE'
        },
    },
    methods: {
        stripeRequestIBAN (client_secret) {
            stripe.confirmSepaDebitPayment(
                client_secret,
                {
                    payment_method: {
                        sepa_debit: element,
                        billing_details: {
                            name: (this.profile) ? this.this.profile.full_name : this.anonymous.first_name + " " + this.anonymous.last_name,
                            email: (this.user) ? this.user.email : this.anonymous.email
                        }
                    }
                }).then(result => {
                    this.$store.commit('loadingFlow')
                    if (!result.error) {
                        // The payment is state processing!
                        if (result.paymentIntent.status === 'processing') {
                            this.localPayment.id = result.paymentIntent.id
                            this.localPayment.provider = "stripe"
                            this.$emit('success', this.localPayment)
                        }
                    } else {
                        // Show error to your customer (e.g., insufficient funds)
                        console.log(result.error.message);
                    }
                });
        },
        purchase () {
            this.$store.commit('loadingFlow')
            if (this.valid.$invalid === false && this.accept) {
                    axios.post(process.env.VUE_APP_BACKEND_URL + '/v1/payment/iban',
                    {
                        amount: parseInt(this.payment.money.amount),
                        currency: this.payment.money.currency,
                        name: this.profile.full_name,
                        email: (this.user) ? this.user.email : this.anonymous.email,
                        country: (this.user) ? this.user.country : this.anonymous.country
                    }
                )
                .then(response => (
                    console.log(response),
                    this.stripeRequestIBAN(response.data.client_secret)
                ))
            } else {
                this.$store.commit('loadingFlow')
                if (this.isDE) {
                    this.$refs.accept.validate()
                }
                this.$emit('not-valid')
            }
        }
    }


}
</script>
