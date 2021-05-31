<template>
    <div class="paypal-payment-container">
        <PayPal 
            ref="paypal"
            :amount="pAmount"
            :currency="payment.money.currency"
            :client="credentials"
            :items="items"
            :disabled="this.valid.$invalid"
            @payment_authorized="purchase"
            @payment-completed="success"
            @payment-validation-error="validationError">
        </PayPal>
    </div>
</template>

<script>
import Money from 'vca-ui/src/utils/Money'
import PayPal from './paypal/PayPalCheckout'
export default {
    name: 'PayPalButton',
    components: {PayPal},
    props: ['payment', 'valid'],
    computed : {
        pAmount () {
            return Money.getPayPalString(this.payment.money.amount)
        },
        items () {
            return [{
                name: "test donation",
                description: "for test",
                quantity: "1",
                price: Money.getPayPalString(this.payment.money.amount),
                currency: this.payment.money.currency
            }]
        }
    },
    data () {
        return {
            credentials: {
                sandbox: process.env.VUE_PAYPAL_PUBLIC_KEY_SANDBOX,
                production: process.env.VUE_PAYPAL_PUBLIC_KEY_PRDOUCTION
            },
            myItems: [
                {
                    "name": "test donation",
                    "description": "for test",
                    "quantity": "1",
                    "price": this.pAmount,
                    "currency": this.payment.money.currency
                },
            ],
            localPayment: this.payment
        }
    },
    methods: {
        success(e) {
            this.localPayment.id = e.id,
            this.localPayment.provider = 'paypal'
            this.$emit("success", this.localPayment)
        },
        error(e) {
            this.$emit("error", e)
        },
        validationError() {
            this.$emit("not-valid")
        },
        purchase () {
            if (this.valid.$invalid === false ) {
                this.$refs.paypal 
            } else {
                this.$emit('not-valid')
            }
        }

    }
}
</script>
<style>
    .paypal-button-label-container {
        color: green;
    }
    .paypal-payment-container {
        text-align: center;
    }
</style>
