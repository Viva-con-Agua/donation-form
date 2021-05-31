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
import Amount from '@/components/stepone/Amount.vue'
import Abo from '@/components/stepone/Abo.vue'
import Interval from '@/components/stepone/Interval.vue'
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
        this.$watch(() => {
                return this.$refs.amount.$v.$invalid
            },(val) => {
                console.log(val)
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
<style lang="scss">
    .slider-box {
        width: 85%;
        margin: auto;
    }
</style>