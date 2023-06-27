<template>
    <div class="skullslider donation-slider">
        <vca-card class="desktop-view">
        </vca-card>
        <div class="count">
            <input type="range" class="slider" :min="slider.min" :max="slider.max" :value="money.amount" :step="steps" @input="setAmount">
        </div>
        <div class="amount">
            <h2>{{ currentAmount }} {{ money.currency }}</h2>
        </div>
        <h3 v-if="setting != 'nwt'" class="main-color">
            {{ getExample }}
        </h3>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'SkullSlider',
    data () {
        return {
            current: 1,
            maxParts: 5
        }
    },
    computed: {
        ...mapGetters({
           slider: 'form/slider',
           setting: 'setting',
           examples: 'company/examples'
        }),
        currentAmount() {
          return (this.money.amount / 100).toLocaleString(this.$i18n.locale)
        },
        steps() {
          return this.slider ? this.slider.steps : 100
        },
        getExample() {
            if (!this.examples) {
              return this.$t('example.default')
            }

            let res = this.examples.filter(t => this.money.amount >= t.value)
            return (res.length > 0) ? this.$t(res[0].message) : this.$t('example.default')

        },
        money: {
            get () {
                return this.$store.state.payment.money
            },
            set(value) {
                this.$store.commit('payment/money', value)
            }
        }
    },
    methods: {
        setAmount (e) {
            this.money = { amount: parseInt(e.target.value), currency: this.money.currency }
        }
    }
}
</script>
<style lang="scss">
  .skullslider {

    .amount {
        h2 {
            color: $mtg-main !important;
        }
    }

    .count {
      width: 100%;
      margin-bottom: 40px;

      .slider {
        -webkit-appearance: none;
        width: 100%;
        height: 15px;
        background: linear-gradient(to right, $mtg-main 0%, $mtg-main 50%, #fff 50%, #fff 100%) !important;
        background: $orange !important;
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
        background-color: $mtg-main !important;
      }
      .slider::-ms-fill-upper {
        background-color: $orange !important;
      }


      /* Firefox
      */
      .slider::-moz-range-progress {
        background-color: $mtg-main !important;
        height: 15px;
        border-radius: 8px;
      }
      .slider::-moz-range-track {
        background-color: $orange !important;
      }
    }

    .count {
      .slider::-moz-range-thumb {
        width: 50px;
        height: 65px;
        background-image: url("~@/assets/img/slider/skull/skull.png");
        background-color: transparent;
        background-position: center;
        background-size: cover;
        border: none;
        cursor: pointer;
      }

      /*Chrome
      */
      .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 50px;
        height: 65px;
        background-image: url("~@/assets/img/slider/skull/skull.png");
        background-color: transparent;
        background-position: center;
        background-size: cover;
        cursor: pointer;
      }
    }
  }
</style>
