<template>
    <div class="faucetslide donation-slider">
        <vca-card class="desktop-view">
            <div class="images">
                <img :src="getFaucet" />
            </div>
        </vca-card>
        <div class="count">
            <input
                type="range"
                class="slider"
                :min="minSlider"
                :max="maxSlider"
                :value="money.amount"
                :step="steps"
                @input="setAmount"
            />
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
import { mapGetters } from "vuex";
export default {
    name: "FaucetSlider",
    data() {
        return {
            current: 1,
            maxParts: 5,
        };
    },
    created() {
        this.setFaucet(this.money);
    },
    computed: {
        ...mapGetters({
            slider: "form/slider",
            setting: "setting",
            examples: "company/examples",
        }),
        minSlider() {
            return this.slider ? this.slider.min : 500;
        },
        maxSlider() {
            return this.slider ? this.slider.max : 15000;
        },
        currentAmount() {
            return (this.money.amount / 100).toLocaleString(this.$i18n.locale);
        },
        steps() {
            return this.slider ? this.slider.steps : 100;
        },
        getExample() {
            if (!this.examples) {
                return this.$t("example.default");
            }

            let res = this.examples.filter((t) => this.money.amount >= t.value);
            return res.length > 0
                ? this.$t(res[0].message)
                : this.$t("example.default");
        },
        money: {
            get() {
                this.setFaucet(this.$store.state.payment.money);
                return this.$store.state.payment.money;
            },
            set(value) {
                this.setFaucet(value);
                this.$store.commit("payment/money", value);
            },
        },
        getFaucet() {
            //return require('@/assets/img/slider/faucet/glas_empty.svg')
            return require("@/assets/img/slider/faucet/glas_" +
                this.current +
                ".png");
        },
    },
    methods: {
        setFaucet(value) {
            let maxSlider = this.slider ? this.slider.max : 10;
            var parts = maxSlider / this.maxParts;
            let current = Math.max(1, Math.round(value.amount / parts));
            current = Math.min(this.maxParts, current);
            this.current = current;
        },
        setAmount(e) {
            this.money = {
                amount: parseInt(e.target.value),
                currency: this.money.currency,
            };
        },
    },
};
</script>
<style lang="scss">
.faucetslide {
    .count {
        .slider::-moz-range-thumb {
            width: 50px;
            height: 50px;
            background-image: url("~@/assets/img/slider/faucet/drop.png");
            background-position: center;
            background-size: cover;
            background-color: transparent;
            border: none;
            cursor: pointer;
        }

        /*Chrome
      */
        .slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 50px;
            height: 50px;
            background-image: url("~@/assets/img/slider/faucet/drop.png");
            background-position: center;
            background-size: cover;
            cursor: pointer;
        }
    }
}
</style>
