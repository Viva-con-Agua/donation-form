<template>
    <div class="paypal-payment-container">
        <vca-field :label="$t('payment.more_details')">
            <PayPal 
                ref="paypal"
                :amount="pAmount"
                :currency="payment.money.currency"
                :client="credentials"
                :items="items"
                @payment_authorized="purchase"
                @payment-completed="success"
                @payment-validation-error="validationError">
            </PayPal>
        </vca-field>
    </div>
</template>

<script>
import Money from 'vca-ui/src/utils/Money'
import PayPal from './paypal/PayPalCheckout'
import { mapGetters } from 'vuex'
export default {
    name: 'PayPalButton',
    components: {PayPal},
    created() {
        this.$store.commit('transaction/payment_type', 'paypal')
        this.$store.commit('transaction/provider', 'paypal')
    },
    computed : {
        ...mapGetters({
           payment: 'payment',
        }),
        transaction: {
            get () {
                return this.$store.state.transaction
            },
            set(value) {
                this.$store.commit('transaction', value)
            }
        },
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
            }
        }
    },
    methods: {
        success(e) {
            this.transaction.id = e.id
            this.$emit("success", this.transaction)
        },
        error(e) {
            this.$emit("error", e)
        },
        validationError() {
            this.$emit("not-valid")
        },
        purchase () {
            this.$refs.paypal 
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
