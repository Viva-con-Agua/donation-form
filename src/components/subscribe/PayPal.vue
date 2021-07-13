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
            plan_id: 'payment/subscription/plan_id'
        }),
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
        success() {
            this.$emit("success")
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
        this.$store.dispatch('payment/subscription/create')
            .then( (response) => {
                    console.log(response)
            })
            .catch(error => {console.log(error)})
    }
}
</script>
<style>
    .paypal-payment-container {
        text-align: center;
    }
</style>
