<template>
    <div class="stepone">

        <FaucetSlider />

        <Amount ref="amount" />
        <Abo />
        <Interval />

        <div class="nav-btn-container">
            <div class="nav-next">
                <button class="submit nav-btn" @click.prevent="submit" :disabled="isValid"> Weiter zu Schritt 2 </button>
            </div>
        </div>
    </div>

</template>
<script>
import FaucetSlider from '@/components/slider/FaucetSlider'
import Amount from '@/components/membership/Amount.vue'
import Abo from '@/components/membership/Abo.vue'
import Interval from '@/components/membership/Interval.vue'
export default {
    name: 'StepOne',
    components: {Amount, Abo, Interval, FaucetSlider},
    methods: {
        submit() {
            if (!this.$refs.amount.$v.$invalid) {
                this.$emit("submit")
            } else {
                this.$refs.amount.validate()
            }
        }
    }
}
</script>