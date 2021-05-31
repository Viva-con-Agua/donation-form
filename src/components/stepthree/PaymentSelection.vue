<template>
    <div>
        
        <vca-field label="$t('paymenttype.label')">
            <div class="btn-center-container">
                <button v-for="(current, index) in paymentTypes" :key="index" :class="{ 'selected': getPaymentType(current.name)}" class="selection-button"  @click.prevent="setPaymentType(current.name)">{{ $t(current.title) }}</button>
            </div>
        </vca-field>


        <SEPA v-if="getPaymentType('sepa')" :product="product" v-on:success="success" :country="country" :valid="valid" @notValid="notValid"/>
        <CiviSEPA v-if="getPaymentType('civisepa')" @isInvalid="isInvalid" :label="$t('payment.civisepa')" />
        <CreditCard v-if="getPaymentType('creditcard')" :product="product" v-on:success="success" :payment="payment" :label="label" :country="country" :valid="valid" @notValid="notValid"/>
        <PayPalButton v-if="getPaymentType('paypal')" v-on:success="success" v-on:error="error" :payment="payment" :valid="valid" @notValid="notValid"/>
    </div>
</template>
<script>
import CiviSEPA from '@/components/payments/subscription/CiviSEPA'
import SEPA from '@/components/payments/subscription/SEPA'
import PayPalButton from '@/components/payments/PayPal'
import CreditCard from '@/components/payments/subscription/CreditCard'

import { mapGetters } from 'vuex'

export default {
    name: 'PaymentSelection',
    components: {SEPA, CiviSEPA, CreditCard, PayPalButton},
    props: ['payment', 'country', 'valid', 'label', 'product'],
    computed: {
       ...mapGetters({
           paymentTypes: 'payment/paymentTypes'
        }),
        paymentType: {
            get () {
                return this.$store.state.transaction.payment_type
            },
            set(value) {
                this.$store.commit('transaction/payment_type', value)
            }
        }
    },
    created() {
        let filter = this.paymentTypes.find(el => el.default)
        this.paymentType = (filter) ? filter.name : this.paymentTypes[0].name
    },
    methods: {
        isInvalid(e) {
            this.$emit("isInvalid", e)            
        },
        success(e) {
            this.$emit("success", e)
        },
        error(e) {
            this.$emit("error", e)
        },
        notValid() {
            this.$emit("notValid")
        },
        getPaymentType(val) {
            return this.paymentType == val
        },
        setPaymentType(val) {
            this.paymentType = val
            this.$emit("paymentType", val)
        }
    },
};
</script>
