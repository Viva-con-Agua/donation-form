<template>
    <div class="stepone">

        <Slider/>

        <Amount ref="amount" />

        <div v-if="hasSubscription">
            <Abo />
            <Interval />
        </div>

        <vca-arrow-navigation @next="submit" :showBack="false" :nextLabel="this.$t('buttons.next')" :nextEnabled="isValid"/>
    </div>

</template>
<script>
import Slider from '@/components/slider/Slider'
import Amount from '@/components/steps/one/Amount.vue'
import Abo from '@/components/steps/one/Abo.vue'
import Interval from '@/components/steps/one/Interval.vue'
export default {
    name: 'StepOne',
    components: {Amount, Abo, Interval, Slider},
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