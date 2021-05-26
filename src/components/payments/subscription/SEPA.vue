<template>
    <div class="stripe-payment-container">
        <div class="vca-input-border"><div ref="element" label="IBAN" class="stripe-payment"></div></div>

        <vca-field  v-if="isDE" label="Weitere Angaben">
            <CheckBox
                :rules="$v.accept"
                ref="accept"
                v-model="accept"
                errorMsg="Bitte bestätige die Ermächtigung">
                        Ich ermächtige Viva con Agua de Sankt Pauli e.V., Zahlungen von meinem Konto mittels Lastschrift zum 15. des Folgemonats einzuziehen. Zugleich weise ich mein Kreditinstitut an, die von Viva con Agua de Sankt Pauli e.V. auf mein Konto gezogene Lastschrift einzulösen.<br>
                        <strong>Hinweis:</strong> Ich kann innerhalb von acht Wochen, beginnend mit dem Belastungsdatum, die Erstattung des belasteten Betrags verlangen. Es gelten dabei die mit meinem Kreditinstitut vereinbarten Bedingungen.
            </CheckBox>
        </vca-field>
        <button type="button" v-on:click.prevent="purchase" :disabled="$v.$invalid" class="stripe-donation-button"> {{ label }} </button>
    </div>
</template>

<script>

import axios from 'axios'
import CheckBox from '../../utils/CheckBox'
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
    props: ['payment', 'valid', 'label', 'product', 'country'],
    components: {CheckBox},
    data() {
        return {
            accept: false
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
        stripeRequestCard(client_secret) {
            stripe.confirmSepaDebitSetup(client_secret, {
                payment_method: {
                    sepa_debit: element,
                    billing_details: {
                        name: this.payment.supporter.first_name + ' ' + this.payment.supporter.last_name,
                        email: this.payment.supporter.email
                    }
                }
            }).then(result => {
                console.log(result)
                if (result.error) {
                    // Show error to your customer (e.g., insufficient funds)
                    console.log(result.error.message);
                } else {
                    // The payment has been processed!
                    console.log(result)
                    if (result.setupIntent.status === 'succeeded') {
                        axios.post(process.env.VUE_APP_BACKEND_URL + '/v1/payment/subscription',
                        { 
                            amount: this.payment.money.amount,
                            currency: this.payment.money.currency,
                            name: this.payment.supporter.first_name + ' ' + this.payment.supporter.last_name,
                            email: this.payment.supporter.email,
                            interval: this.payment.transaction.interval,
                            locale: this.payment.supporter.country,
                            type: 'sepa_debit',
                            product: this.product
                        })
                        .then(response => {
                            this.payment.transaction.id = response.data.id,
                            this.payment.transaction.provider = "stripe",
                            this.payment.transaction.payment_type = 'sepa',
                            this.$emit('success', this.payment)
                        })
                    }
                }
            });
        },
        purchase () {
            if (this.valid.$invalid === false) {
                axios.post(process.env.VUE_APP_BACKEND_URL + '/v1/payment/default',
                    { 
                        amount: this.payment.money.amount,
                        name: this.payment.supporter.first_name + ' ' + this.payment.supporter.last_name,
                        email: this.payment.supporter.email,
                        interval: this.payment.transaction.interval,
                        currency: this.payment.money.currency,
                        locale: this.payment.supporter.country,
                        type: 'sepa_debit'
                    })
                    .then(response => (
                        console.log(response.data),
                        this.stripeRequestCard(response.data.client_secret)
                    ))
            }else {
                this.$emit('notValid')
            }
        },
        validate () {
            if (this.isDE) {
                this.$refs.accept.validate()
            }
            this.$emit('validate') 
        }
    }


}
</script>
