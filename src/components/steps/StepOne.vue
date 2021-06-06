<template>
    <div class="stepone">

        <div class="slider-box">
            <FaucetSlider />
        </div>

        <Amount ref="amount" />
        <Abo />
        <Interval />

        <ArrowNavigation @next="submit" :showBack="false" :nextEnabled="isValid"/>
    </div>

</template>
<script>
import FaucetSlider from '@/components/slider/FaucetSlider'
import Amount from '@/components/steps/one/Amount.vue'
import Abo from '@/components/steps/one/Abo.vue'
import Interval from '@/components/steps/one/Interval.vue'
import ArrowNavigation from '@/components/layout/ArrowNavigation.vue'
export default {
    name: 'StepOne',
    components: {Amount, Abo, Interval, FaucetSlider, ArrowNavigation},
    data() {
        return {
            isValid: true 
        }
    },
    mounted () {
        this.isValid = !this.$refs.amount.$v.$invalid
        this.$watch(() => {
                return this.$refs.amount.$v.$invalid
            },(val) => {
                this.isValid = !val
            }
        )
    },
    methods: {
        submit() {
            this.$emit("submit")
        }
    },
}
</script>
<style lang="scss" scoped>
    .slider-box {
        width: 85%;
        margin: auto;
    }
</style>