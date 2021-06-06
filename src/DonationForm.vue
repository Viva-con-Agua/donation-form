<template>
    <vca-form>
        <Headline />
        <HeaderSteps :currentStep=step :steps=steps />
        <div class="donation-form-content">
            <StepOne v-if="step === 1" @submit="step++"/>
            <StepTwo v-if="step === 2" @submit="step++" @back="step--"/>
            <StepThree v-if="step === 3" :product="product" @back="step--" @success="success"/>
            <StepThanks v-if="step === 4"/>
        </div>
        <PaymentFooter v-if="step < 4" />
    </vca-form>
</template>
<script>
//import axios from 'axios'
import StepOne from '@/components/steps/StepOne'
import StepTwo from '@/components/steps/StepTwo'
import StepThree from '@/components/steps/StepThree'
import StepThanks from '@/components/steps/StepThanks'
import PaymentFooter from '@/components/layout/Footer'
import HeaderSteps from '@/components/layout/HeaderSteps'
import Headline from '@/components/layout/Headline'
export default {
    name: 'DonationForm',
    components: {StepOne, StepTwo, StepThree, StepThanks, PaymentFooter, HeaderSteps, Headline },
    data() {
        return {
            step: 3,
            steps: 
            [
                {id: 1, label: this.$t('header.amount') },
                {id: 2, label: this.$t('header.contact') },
                {id: 3, label: this.$t('header.payment') },
                {id: 4, label: this.$t('header.thanks') }
            ],
            currencies: [
                {
                    label: '€',
                    value: 'EUR'
                }
            ]
        }
    },
    mounted() {
        //this.getLocation()
    },
    methods: {
        success(e) {
            this.$emit("success", e)
            this.step = 4
        },
        /*getLocation() {
            var that = this
            axios.get("https://ipinfo.io/json?token=" + process.env.VUE_APP_IPINFO_TOKEN)
                .then(response => (
                    that.payment.supporter.country = response.data.country
                ))
                .catch(function (error) {
                    if (error.response) {
                      console.log(error.response.data.error.message);
                    }
                })
        }*/
    }
}
</script>

<style lang="scss">
    .vca-flexbox {
        flex-basis: 100% !important;
    }



.donation-form-content {
    padding: 10px;
    border: solid 2px $vca-main;
}


.btn-center-container .selected {
    color: #fff;
    background-color: #008fc3;
}


</style>

<style type="text/css">
.vca-input-border {
    box-sizing: border-box;
}
</style>