<template>
    <div class="stepone">

        <div class="slider-box">
            <CupSlider v-if="slider && slider.name == 'faucet'" />
            <FaucetSlider v-if="slider && slider.name == 'cups'"/>
        </div>

        <Amount ref="amount" />

        <div v-if="hasSubscription">
            <Abo />
            <Interval />
        </div>

        <vca-arrow-navigation @next="submit" :showBack="false" :nextLabel="this.$t('buttons.next')" :nextEnabled="isValid"/>
    </div>

</template>
<script>
import FaucetSlider from '@/components/slider/FaucetSlider'
import CupSlider from '@/components/slider/CupSlider'
import Amount from '@/components/steps/one/Amount.vue'
import Abo from '@/components/steps/one/Abo.vue'
import Interval from '@/components/steps/one/Interval.vue'
import { mapGetters } from 'vuex'
export default {
    name: 'StepOne',
    components: {Amount, Abo, Interval, FaucetSlider, CupSlider},
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
        })
    },
    computed: {
        ...mapGetters({
           slider: 'form/slider'
        }),
        hasSubscription() {
            return this.$store.state.form.current.subscription_types != null
        }
    },
    methods: {
        submit() {
            this.gtmTrack("click", "StepOne Next donation-form", 0)
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
