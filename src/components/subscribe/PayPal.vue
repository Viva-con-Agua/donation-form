<template>
    <div class="paypal-payment-container">
        <PayPal 
            ref="paypal"
            :client="credentials"
            :plan_id="plan_id"
            vault="true"
            @payment_authorized="purchase"
            @payment-completed="success"
            @payment-validation-error="validationError">
        </PayPal>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PayPal from './paypal/PayPalCheckout'
export default {
    name: 'PayPalButton',
    components: {PayPal},
    props: ['valid'],
    computed : {
        ...mapGetters({
            payment: 'payment',
            plan_id: 'payment/paypal/plan_id'
        }),
       // pAmount () {
       //     return Money.getPayPalString(this.$store.getters("payment").money.amount)
       // },
       // items () {
       //     return [{
       //         name: "test donation",
       //         description: "for test",
       //         quantity: "1",
        //        price: Money.getPayPalString(this.$store.getters("payment").money.amount),
       //         currency: this.payment.money.currency
       //     }]
        //}
    },
    data () {
        return {
            credentials: {
                sandbox: process.env.VUE_PAYPAL_PUBLIC_KEY_SANDBOX,
                production: process.env.VUE_PAYPAL_PUBLIC_KEY_PRDOUCTION
            },
        }
    },
    methods: {
        success(e) {
            this.payment.transaction.id = e.id
            this.payment.transaction.provider = 'paypal'
            this.payment.transaction.payment_type = 'paypal'
            this.$emit("success", this.payment)
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
    },
    created() {
        this.$store.dispatch('payment/paypal/billing_plan')
            .then((response) => {console.log(response)})
            .catch(error => {console.log(error)})
    }
}
</script>
<style>
    .paypal-payment-container {
        text-align: center;
    }
</style>
