<template>
    <div class="steptwo">
        <div v-if="errorMSG">
            <h2> Payment_id: {{payment}} </h2>
            <span>{{ $t('error.payment') }}</span>
        </div>
        <PaymentSelection v-if="!abo" ref="selection" :product="product" v-on:success="success" v-on:error="error" @isInvalid="validate"/>
        <SubscribeSelection v-if="abo" ref="selection" :product="product" v-on:success="success" v-on:error="error" @isInvalid="validate"/>
        <Policies />
        <vca-arrow-navigation @next="commit" @success="success" @back="back" :backLabel="this.$t('buttons.back')" :nextLabel="getLabel" :showNext="paymentType != 'paypal'" :nextLong="true" :nextEnabled="!isInvalid"/>
    </div>
</template>
<script>
import PaymentSelection from '@/components/steps/three/PaymentSelection'
import SubscribeSelection from '@/components/steps/three/SubscribeSelection'
import Policies from '@/components/steps/three/Policies'
import Money from 'vca-ui/src/utils/Money'
import { mapGetters } from 'vuex'
export default {
    name: 'StepThree',
    props: ['product'],
    components: {PaymentSelection, SubscribeSelection, Policies},
    data() {
        return {
            isInvalid: true,
            errorMSG: false
        }
    },
    computed: {
        ...mapGetters({
            setting: 'setting',
            payment: 'payment/payment_id',
            money: 'payment/money',
            abo: 'payment/abo',
            paymentType: 'payment/payment_type',
            trackingData: 'payment/trackingData'
        }),
        getLabel() {
            if (this.setting == 'nwt') {
                return this.$t('payment.submit.pay', {0: Money.convertDE(this.money.amount), 1: this.money.currency})
            } else {
                return this.$t('payment.submit.donate', {0: Money.convertDE(this.money.amount), 1: this.money.currency})
            }
        }
    },
    methods: {
        success() {
            if (this.paymentType != "paypal") {
                this.$store.commit('loadingFlow')
            }
            this.$emit("success")
        },
        error(e) {
            if (this.paymentType != "paypal") {
                this.$store.commit('loadingFlow')
            }
            this.notification({title: "Error", body:"Spende nicht möglich. Danke fürs Testen! Schreib uns bitte die PaymentID", type:"error"})
            this.errorMSG = true
            this.$emit("error", e)
        },
        validate(e) {
            this.isInvalid = e
        },
        commit() {
            this.$store.commit('loadingFlow')
            this.$store.commit("payment/trackingData", "view_donation_form_step4")
            this.trackingTrigger(this.trackingData)
            this.gtmTrack("click", "StepTree Donate donation-form", this.money.amount/100)
            this.$refs.selection.commit()
        },
        back() {
            this.$emit("back")
        }
    }
}
</script>
