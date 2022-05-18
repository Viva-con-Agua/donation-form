<template>
    <div>
        <vca-loading v-if="loadingFlow"/>
        <div v-if="iserror">
            <Headline :text="$t('error.not_found.headline')" />
            <vca-card v-html="$t('error.not_found.text')"></vca-card>
        </div>
        <div v-else :class="{'mtg-theme': setting == 'mtg'}">
            <Headline :text="getText" />
            <Slider v-if="step === 4"/>
            <HeaderStepsMtg v-if="setting == 'mtg'" :currentStep=step :steps=steps />
            <HeaderSteps v-else :currentStep=step :steps=steps />
            <div class="vca-card vca-border" id="topElement">
                <StepOne v-if="step === 1" @submit="navigate(), step++"/>
                <StepTwo v-if="step === 2" @submit="navigate(), step++" @back="navigate(), step--"/>
                <StepThree v-if="step === 3" ref="stepthree" :product="product" @back="navigate(), step--" @success="success"/>
                <StepThanks v-if="step === 4"/>
            </div>
            <PaymentFooter v-if="step < 4" />
        </div>
    </div>
</template>
<script>
//import axios from 'axios'
import StepOne from '@/components/steps/StepOne'
import StepTwo from '@/components/steps/StepTwo'
import StepThree from '@/components/steps/StepThree'
import StepThanks from '@/components/steps/StepThanks'
import Slider from '@/components/steps/four/Slider'
import PaymentFooter from '@/components/layout/Footer'
import HeaderSteps from '@/components/layout/HeaderSteps'
import HeaderStepsMtg from '@/components/layout/HeaderStepsMtg'
//import LanguageSelection from "@/components/utils/LanguageSelection"
import Headline from '@/components/layout/Headline'
import { mapGetters } from 'vuex'
export default {
    name: 'DonationForm',
    components: {Slider, StepOne, StepTwo, StepThree, StepThanks, PaymentFooter, HeaderSteps, HeaderStepsMtg, Headline },
    props: {
        donation_form_id: {
            type: String,
            default: ""
        },
        lang: {
            type: String,
            default: "de"
        },
        setting: {
            type: String,
            default: "de"
        },
        email: {
            type: String,
            default: null
        }
    },
    created() {
        this.$store.commit('loadingFlow')
        this.$store.commit('setting', this.setting)

        if (this.email) {
            this.$store.commit('payment/email', this.email)
        }

        this.$store.dispatch({type: 'init', data: this.donation_form_id})
            .then(resp => {console.log(resp)})
            .catch(error => {console.log(error)})
            .finally(this.$store.commit('loadingFlow'))

        this.defaultLanguage(this.lang)

        this.steps = [
                {id: 1, label: this.$t('header.amount') },
                {id: 2, label: this.$t('header.contact') },
                {id: 3, label: this.$t('header.payment') },
                {id: 4, label: this.$t('header.thanks') }
            ]
    },
    data() {
        return {
            iserror: false,
            step: 1,
            steps: []
        }
    },
    computed: {
        ...mapGetters({
            product: 'form/product',
            loadingFlow: 'loadingFlow'
        }),
        getText() {
            if(this.setting == 'nwt') {
                return this.$t('headline.nwt')
            } else if (this.setting == 'mtg') {
                return this.$t('headline.mtg')
            } else {
                return this.step == 4 ? this.$t('headline.thanks'): this.$t('headline.donate')
            }
        }
    },
    methods: {
        defaultLanguage(language)  {
          localStorage.language = language
          this.$i18n.locale = language
          this.language = language
        },
        navigate() {
            var top = document.getElementById('topElement').offsetTop;
            window.scrollTo(0, top);
            window.top.postMessage('navigate', '*')
        },
        success() {
            this.$emit("success")
            //this.$refs.stepthree.commit()
            this.step = 4
        }
    }
}
</script>
<style lang="scss">
    .desktop-view {
        display: block;
        @include media(500px) {
            display: none;
        }
    }
    .checkbox-text {
        @include media(small) {
            font-size: 0.85em;
        }
    }
    .vca-field .vca-field-label label {
        font-size: 1em !important;
        @include media(large) {
            font-size: 1.25em !important;
        }
    }
    .mobile-view {
        display: none;
        @include media(small) {
            display: contents;
        }
    }
    .vca-card, .vca-field {
        @include media(small) {
            padding: 0.3em !important;
        }
    }
    .arr-btn-box {
        width: max-content;
    }
</style>