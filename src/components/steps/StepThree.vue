<template>
    <div class="steptwo">
        <PaymentSelection :product="product" v-on:success="success" @isInvalid="validate"/>
        <vca-arrow-navigation @next="success" @back="back" :backLabel="this.$t('buttons.back')" :nextLabel="getLabel" :nextEnabled="!isInvalid"/>
    </div>
</template>
<script>
import PaymentSelection from '@/components/steps/three/PaymentSelection'
import Money from 'vca-ui/src/utils/Money'
import { mapGetters } from 'vuex'
export default {
    name: 'StepThree',
    props: ['product'],
    components: {PaymentSelection},
    data() {
        return {
            isInvalid: true
        }
    },
    computed: {
        ...mapGetters({
           money: 'payment/money'
        }),
        getLabel() {
            return this.$t('payment.submit', {0: Money.convertDE(this.money.amount), 1: this.money.currency})
        }
    },
    methods: {
        success(e) {
            this.$emit("success", e)
        },
        validate(e) {
            this.isInvalid = e
        },
        back() {
            this.$emit("back")
        }
    }
}
</script>
