<template>
    <div class="stepone">

        <div v-if="setting == 'nwt'" class="highlight vca-center vca-column" >
            <h2 class="text-center">{{ $t('nwt.header') }}</h2>
            <h3 class="text-center" v-html="$t('nwt.infotext')"></h3>
        </div>

        <Slider/>
        <div v-if="setting == 'nwt'" class="text-center">
            <span class="secondary-light">{{ $t('nwt.sliderinfo') }}</span>
        </div>
        <Amount ref="amount" />

        <div v-if="hasSubscription">
            <Abo />
            <Interval />
        </div>

        <vca-arrow-navigation
        @next="submit"
        :showBack="false"
        :nextLabel="this.$t('buttons.next')"
        :nextEnabled="isValid"
        v-observe-visibility="visibilityChanged"/>
    </div>

</template>
<script>
import { mapGetters } from 'vuex'
import Slider from '@/components/slider/Slider'
import Amount from '@/components/steps/one/Amount.vue'
import Abo from '@/components/steps/one/Abo.vue'
import Interval from '@/components/steps/one/Interval.vue'
export default {
    name: 'StepOne',
    components: {Amount, Abo, Interval, Slider},
    data() {
        return {
            isValid: true,
            tracked: false

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
            return this.$store.state.form.current.subscription_types != null && this.$store.state.form.current.subscription_types.length > 0
        },
        ...mapGetters({
            setting: 'setting',
            trackingData: 'payment/trackingData'
        })
    },
    methods: {
        submit() {
            this.$store.commit("payment/trackingData", "view_donation_form_step2")
            var data = this.trackingData
            this.trackingTrigger(data)
            this.gtmTrack("click", "StepOne Next donation-form", 0)
            this.$emit("submit")
        },
        visibilityChanged (isVisible, entry) {
            this.isVisible = isVisible
            if (entry.isIntersecting && !this.tracked) {
                this.tracked = true
                this.trackingTrigger(this.trackingData)
            }
        }
    },
}
</script>
