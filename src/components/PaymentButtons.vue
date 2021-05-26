<template>
    <div>
        <div class="btn-center-container">
            <button v-if="isDE || isAT" :class="{ 'selected': getPaymnetType('sepa')}" class="selection-button"  @click.prevent="setPaymentType('sepa')">SEPA</button>
            <button v-if="isDE || isAT" :class="{ 'selected': getPaymnetType('card')}" class="selection-button"  @click.prevent="setPaymentType('card')">Kreditkarte</button>
            <!--button v-if="isDE || isAT" :class="{ 'selected': getPaymnetType('paypal')}" class="selection-button"  @click.prevent="setPaymentType('paypal')">Paypal</button-->
        </div>
        <div class="payment-type">
            <CiviSEPA v-if="getPaymnetType('sepa')" :product="product" v-on:success="success" :payment="payment" :label="label" :country="country" :valid="valid" @notValid="notValid"/>
            <CreditCard v-if="getPaymnetType('card')" :product="product" v-on:success="success" :payment="payment" :label="label" :country="country" :valid="valid" @notValid="notValid"/>
            <PayPalButton v-if="getPaymnetType('paypal')" v-on:success="success" v-on:error="error" :payment="payment" :valid="valid" @notValid="notValid"/>
        </div>
    </div>
</template>
<script>
import CiviSEPA from './payments/subscription/CiviSEPA'
import PayPalButton from './payments/PayPal'
import CreditCard from './payments/subscription/CreditCard'
export default {
    name: 'PaymentButtons',
    components: {CiviSEPA, CreditCard, PayPalButton},
    props: ['payment', 'country', 'valid', 'label', 'product'],
    data () {
        return {
            paymentType: "sepa"
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
        success(e) {
            this.$emit("success", e)
        },
        error(e) {
            this.$emit("error", e)
        },
        notValid() {
            this.$emit("notValid")
        },
        getPaymnetType(val) {
            return this.paymentType == val
        },
        setPaymentType(val) {
            this.paymentType = val
            this.$emit("paymentType", val)
        }
    },
};
</script>
