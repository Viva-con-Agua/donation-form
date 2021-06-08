<template>
    <div class="steptwo">
        <PaymentSelection :product="product" v-on:success="success" @isInvalid="validate"/>
        <ArrowNavigation @next="success" @back="back" :nextEnabled="!isInvalid"/>
    </div>
</template>
<script>
import PaymentSelection from '@/components/steps/three/PaymentSelection'
import ArrowNavigation from '@/components/layout/ArrowNavigation.vue'
export default {
    name: 'StepThree',
    props: ['product'],
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
            this.isInvalid = e
        },
        back() {
            this.$emit("back")
        }
    }
}
</script>
