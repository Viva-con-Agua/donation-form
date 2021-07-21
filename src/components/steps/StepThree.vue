<template>
    <div class="steptwo">
        <PaymentSelection v-if="!abo" ref="selection" :product="product" v-on:success="success" v-on:error="error" @isInvalid="validate"/>
        <SubscribeSelection v-if="abo" ref="selection" :product="product" v-on:success="success" v-on:error="error" @isInvalid="validate"/>
        <Policies />
        <vca-arrow-navigation @next="commit" @success="success" @back="back" :backLabel="this.$t('buttons.back')" :nextLabel="getLabel" :showNext="paymentType != 'paypal'" :nextEnabled="!isInvalid"/>
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
            isInvalid: true
        }
    },
    computed: {
        ...mapGetters({
            money: 'payment/money',
            abo: 'payment/abo',
            paymentType: 'payment/payment_type'
        }),
        getLabel() {
            return this.$t('payment.submit', {0: Money.convertDE(this.money.amount), 1: this.money.currency})
        }
    },
    methods: {
        success(e) {
            this.$store.commit('loadingFlow')
            this.$emit("success", e)
        },
        error(e) {
            this.$store.commit('loadingFlow')
            this.$emit("error", e)
        },
        validate(e) {
            this.isInvalid = e
        },
        commit() {
            this.$store.commit('loadingFlow')
            this.$refs.selection.commit()
        },
        back() {
            this.$emit("back")
        }
    }
}
</script>
