<template>
    <div class="faucetslide">
        <div class="images-container">
        <div class="images">
            <div  class="images_empty">
                <img :src="getFaucet"/>
            </div>
        </div>
    </div>
    <div class="count">
        <input type="range" class="slider" :min="amountMin" :max="amountMax" :value="money.amount" step="500" @input="setAmount">
    </div>
    <div class="amount">
      <h2>{{ currentAmount }} {{ money.currency }}</h2>
    </div>
    <div class="example">
        {{ getExample }}
    </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'FaucetSlider',
    data () {
        return {
            current: 1,
            steps: 5,
        }
    },
    created() {
        this.setFaucet(this.money)
    },
    computed: {       
        ...mapGetters({
           minAmount: 'payment/minAmount'
        }),
        currentAmount() {
          return (this.money.amount / 100).toLocaleString(this.$i18n.locale)
        },
        getExample() {
            if (this.money.amount >= 8000) {
                return this.$t('example.workshop')
            } else if (this.money.amount >= 5000) {
                return this.$t('example.trees')
            } else if (this.money.amount >= 2000) {
                return this.$t('example.filter')
            } else if (this.money.amount >= 1500) {
                return this.$t('example.soap')
            }
            return this.$t('example.default')
        },
        amountMin() {
            return this.minAmount
        },
        amountMax() {
            return 10000
        },
        money: {
            get () {
                return this.$store.state.payment.money
            },
            set(value) {
                this.setFaucet(value)
                this.$store.commit('payment/money', value)
            }
        },
        getFaucet() {
            return require('@/assets/img/slider/faucet/glas_' + this.current + '.png')
        }
    },
    methods: {
        setFaucet(value) {
            var parts = this.amountMax / this.steps
            let current = Math.max(1, Math.round(value.amount / parts))
            this.current = current
        },
        setAmount (e) {
            this.money = { amount: parseInt(e.target.value), currency: this.money.currency }
        }
    }
}
</script>
<style>
.faucetslide input {
    width: 100%;
    box-shadow: none;
}
.faucetslide .images {
    /*display: flex;
    flex-direction: row;*/
    white-space: nowrap;
    width: auto;
    margin: auto;
    display: table;
}
.count {
    width: 100%;
}
.count input[type=range] {
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;   
} 

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  background: #008fc3;
  border-radius: 8px;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  background-image: url("~@/assets/img/slider/faucet/drop.png");
  background-position: center;
  background-size: cover;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 35px;
  height: 35px;
  background-image: url("~@/assets/img/slider/faucet/drop.png");
  background-position: center;
  background-size: cover;
  background-color: transparent;
  border: none;
  cursor: pointer;
}



</style>
