<template>
    <div class="steptwo">
        <PaymentSelection :product="product" v-on:success="success" :payment="payment" @isInvalid="validate" :label="label" :country="country" :valid="valid" @notValid="notValid"/>

        <ArrowNavigation @next="success" @back="back" :nextEnabled="!isInvalid"/>
    </div>
</template>
<script>
import PaymentSelection from '@/components/stepthree/PaymentSelection'
import ArrowNavigation from '@/components/layout/ArrowNavigation.vue'
export default {
    name: 'StepThree',
    props: ['payment', 'country', 'valid', 'label', 'product'],
    components: {PaymentSelection, ArrowNavigation},
    data() {
        return {
            isInvalid: true
        }
    },
    methods: {
        success(e) {
            this.$emit("success", e)
        },
        validate(e) {
            console.log(e)
            this.isInvalid = e
        },
        notValid() {
            this.$emit("notValid")
        },
        back() {
            this.$emit("back")
        }
    }

}
</script>
