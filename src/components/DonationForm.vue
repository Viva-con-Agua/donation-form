<template>
    <div>
        <Headline />
        <HeaderSteps :currentStep=step :steps=steps />
        <div class="vca-card vca-border">
            <StepOne v-if="step === 1" @submit="step++"/>
            <StepTwo v-if="step === 2" @submit="step++" @back="step--"/>
            <StepThree v-if="step === 3" ref="stepthree" :product="product" @back="step--" @success="success"/>
            <StepThanks v-if="step === 4"/>
        </div>
        <PaymentFooter v-if="step < 4" />
    </div>
</template>
<script>
//import axios from 'axios'
import StepOne from '@/components/steps/StepOne'
import StepTwo from '@/components/steps/StepTwo'
import StepThree from '@/components/steps/StepThree'
import StepThanks from '@/components/steps/StepThanks'
import PaymentFooter from '@/components/layout/Footer'
import HeaderSteps from '@/components/layout/HeaderSteps'
//import LanguageSelection from "@/components/utils/LanguageSelection"
import Headline from '@/components/layout/Headline'
import { mapGetters } from 'vuex'
export default {
    name: 'DonationForm',
    components: {StepOne, StepTwo, StepThree, StepThanks, PaymentFooter, HeaderSteps, Headline },
    props: {
        campaign_id: {
            type: String,
            default: ""
        }
    },
    created() {
        this.$store.dispatch({type: 'init', data: this.campaign_id})
            .then(resp => console.log(resp))
            .catch(error => console.log(error))
    },
    data() {
        return {
            step: 1,
            steps: 
            [
                {id: 1, label: this.$t('header.amount') },
                {id: 2, label: this.$t('header.contact') },
                {id: 3, label: this.$t('header.payment') },
                {id: 4, label: this.$t('header.thanks') }
            ]
        }
    },
    computed: {
        ...mapGetters({
            product: 'campaign/product'
        })
    },
    methods: {
        success(e) {
            this.$emit("success", e)
            this.$refs.stepthree.commit()
            this.step = 4
        }
    }
}
</script>