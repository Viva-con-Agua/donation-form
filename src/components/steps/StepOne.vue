<template>
    <div class="stepone">

        <div class="slider-box">
            <CupSlider v-if="slider && slider.name == 'cups'" />
            <FaucetSlider v-if="slider && slider.name == 'faucet'"/>
            <FaucetBellSlider v-if="slider && slider.name == 'faucetbells'"/>
            <MulledWineSlider v-if="slider && slider.name == 'mulled'" />
            <ValentineSlider v-if="slider && slider.name == 'valentine'" />
            <Run4WaterSlider v-if="slider && slider.name == 'run4water'" />
            <EasterSlider v-if="slider && slider.name == 'easter'" />
            <MhdSlider v-if="slider && slider.name == 'mhd'" />
            <WwdSlider v-if="slider && slider.name == 'wwd'" />

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
import FaucetBellSlider from '@/components/slider/FaucetBellSlider'
import MhdSlider from '@/components/slider/MhdSlider'
import ValentineSlider from '@/components/slider/ValentineSlider'
import MulledWineSlider from '@/components/slider/MulledWineSlider'
import WwdSlider from '@/components/slider/WwdSlider'
import Run4WaterSlider from '@/components/slider/Run4WaterSlider'
import EasterSlider from '@/components/slider/EasterSlider'
import CupSlider from '@/components/slider/CupSlider'
import Amount from '@/components/steps/one/Amount.vue'
import Abo from '@/components/steps/one/Abo.vue'
import Interval from '@/components/steps/one/Interval.vue'
import { mapGetters } from 'vuex'
export default {
    name: 'StepOne',
    components: {Amount, Abo, Interval, FaucetSlider, CupSlider, MulledWineSlider, FaucetBellSlider, ValentineSlider, Run4WaterSlider, EasterSlider, MhdSlider, WwdSlider},
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
<style lang="scss">
    .donation-slider {
    input {
      width: 100%;
      box-shadow: none;
    }

    .images {
      white-space: nowrap;
      width: 60%;
      margin: auto;
      display: flex;
      position: relative;

      @include media(large) {
        width: auto;
        display: table;
        text-align: center;
      }

      img {
        z-index: 10;
        width: 30%;
        margin: auto;
        position: relative;
      }

    }
    .amount h2 {
      margin: 15px;
    }

    .count {
      width: 100%;

      .slider {
        -webkit-appearance: none;
        width: 100%;
        height: 15px;
        background: linear-gradient(to right, #82CFD0 0%, #82CFD0 50%, #fff 50%, #fff 100%);
        background: $primary-light;
        border-radius: 8px;
        outline: none;
        opacity: 0.7;
        -webkit-transition: .2s;
        transition: opacity .2s;
      }

      .slider:hover {
        opacity: 1;
      }

      /* IE
      */
      .slider::-ms-fill-lower {
        background-color: $main-color; 
      }
      .slider::-ms-fill-upper {  
        background-color: $primary-light;
      }


      /* Firefox
      */
      .slider::-moz-range-progress {
        background-color: $main-color; 
        height: 15px;
        border-radius: 8px;
      }
      .slider::-moz-range-track {  
        background-color: $primary-light;
      }
    }

    .count input[type=range] {
      -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
      -moz-box-sizing: border-box;    /* Firefox, other Gecko */
      box-sizing: border-box;   
    }
}

</style>
