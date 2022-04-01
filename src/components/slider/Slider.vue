<template>
    <div class="slider-box">
        <CupSlider v-if="slider && slider.name == 'cups'" />
        <FaucetBellSlider v-else-if="slider && slider.name == 'faucetbells'"/>
        <MulledWineSlider v-else-if="slider && slider.name == 'mulled'" />
        <ValentineSlider v-else-if="slider && slider.name == 'valentine'" />
        <Run4WaterSlider v-else-if="slider && slider.name == 'run4water'" />
        <EasterSlider v-else-if="slider && slider.name == 'easter'" />
        <MhdSlider v-else-if="slider && slider.name == 'mhd'" />
        <WwdSlider v-else-if="slider && slider.name == 'wwd'" />
        <FaucetSlider v-else/>
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
import { mapGetters } from 'vuex'
export default {
    name: 'Slider',
    components: {FaucetSlider, CupSlider, MulledWineSlider, FaucetBellSlider, ValentineSlider, Run4WaterSlider, EasterSlider, MhdSlider, WwdSlider},
    computed: {
        ...mapGetters({
           slider: 'form/slider'
        })
    }
}
</script>
<style lang="scss">
    .slider-box {
        width: 95%;
        padding: 20px 0 0 0;
        margin: auto;
        @include media(large) {
            width: 85%;
        }
    }

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
