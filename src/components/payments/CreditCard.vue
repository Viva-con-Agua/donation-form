<template>
    <div class="stripe-payment-container">
        <div class="vca-input-border"><div id="card" ref="card" class="stripe-payment"></div></div>
    </div>
</template>

<script>
//import axios from 'axios'

import { mapGetters } from 'vuex'

import {loadStripe} from '@stripe/stripe-js';

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
    created() {
        loadStripe(process.env.VUE_APP_STRIPE_PUBLIC_KEY).
            then ( (result) =>
                  { 
                      console.log(result)
                      this.stripe = result
                      this.element = result.elements().create("card", this.options)
                      // do stuff with card if you have too...
                      this.$store.commit('transaction/payment_type', 'creditcard')
                      this.$store.commit('transaction/provider', 'stripe')
                      //this.element = this.elements.create('card', this.options)

                      this.element.on('change', (event) => { 
                          if (!event.complete) {
                              this.cardInvalid = true
                          } else {
                              this.cardInvalid = false
                          }
                          this.$emit('isInvalid', this.isInvalid)
                      })
                      this.$emit('isInvalid', this.isInvalid)
                    this.element.mount(this.$refs.card)
                  },
                 )

    },
    computed: {
        isInvalid() {
            return this.cardInvalid
        },
        ...mapGetters({
            contact: 'payment/contact'
        })

    },
    methods: {
        stripeRequestCard(client_secret) {
            this.stripe.confirmCardPayment(client_secret, {
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
                    if (result.paymentIntent.status === 'succeeded') {
                        console.log(result)
                        this.$store.commit("transaction/id", result.paymentIntent.id)
                        this.$emit('success')
                    }
                }
            });
        },
        purchase () {
            if (!this.isInvalid) {
                console.log("purchase")
                this.$store.dispatch('payment/stripe/payment_intent')
                /*axios.post(process.env.VUE_APP_BACKEND_URL + '/v1/donations/intent', { 
                    amount: this.payment.money.amount,
                    name: this.anonymous.first_name + ' ' + this.anonymous.last_name,
                    email: this.anonymous.email,
                    currency: this.payment.money.currency,
                    payment_type: "card",
                    locale: this.$i18n.locale
                })*/
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
