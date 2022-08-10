<template>
    <vca-field
        class="typo-roboto"
        id="amount"
        :label="$t('amount.label.donate_2')"
    >
        <vca-row>
            <vca-column>
                <vca-row class="button-wrapper">
                    <button
                        @click="setAmount(2500)"
                        class="vca-button selection"
                        :class="{ inactive: !isActive(2500) }"
                    >
                        25 €
                    </button>
                    <button
                        @click="setAmount(5000)"
                        class="vca-button selection"
                        :class="{ inactive: !isActive(5000) }"
                    >
                        50 €
                    </button>
                </vca-row>
                <vca-row class="button-wrapper">
                    <button
                        @click="setAmount(10000)"
                        class="vca-button selection"
                        :class="{ inactive: !isActive(10000) }"
                    >
                        100 €
                    </button>
                    <button
                        @click="setAmount('custom')"
                        class="vca-button selection"
                        :class="{ inactive: !isActive('custom') }"
                    >
                        {{ $t("amount.custom") }}
                    </button>
                </vca-row>
                <vca-row>
                    <div></div>
                    <vca-money-input
                        v-if="current == 'custom'"
                        ref="money"
                        v-model="money"
                        class="amount-field"
                        :css="getCSS"
                        :min="minAmount / 100"
                        :threshold="threshold"
                        :rules="$v.money"
                        :errorMsg="errorMessage"
                        :topText="$t('amount.toptext')"
                    />
                </vca-row>
            </vca-column>
            <vca-row>
                <vca-card v-if="current != 'custom'" class="vertical-center">
                    <div class="example-wrapper">
                        <div class="vertical-center">
                            <img :src="getImgSrc" class="example-image" />
                        </div>
                        <div class="example-content">
                            <p>{{ $t("example.icon." + money.amount) }}</p>
                        </div>
                    </div>
                </vca-card>
            </vca-row>
        </vca-row>
    </vca-field>
</template>
<script>
//import VcaMoneyInput from '@/../../vca-ui/src/form/VcaMoneyInput.vue'
import { required, minValue } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
export default {
    name: "Amount",
    //    components: {VcaMoneyInput},
    props: {
        rules: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            css: "grey bold",
        };
    },
    methods: {
        setAmount(amount) {
            if (amount == "custom") {
                this.current = "custom";
            } else {
                this.current = "amount";
                this.money = {
                    currency: this.money.currency,
                    amount: amount,
                };
            }
        },
        isActive(amount) {
            if (amount == "custom") {
                return this.current == "custom";
            } else {
                return this.current == "amount" && this.money.amount == amount;
            }
        },
    },
    computed: {
        getImgSrc() {
            if ([2500, 5000, 10000].includes(this.money.amount)) {
                return require("@/assets/icons/icon-" +
                    this.money.amount +
                    ".png");
            }
            return require("@/assets/icons/icon-2500.png");
        },
        ...mapGetters({
            slider: "form/slider",
            setting: "setting",
            minAmount: "form/minAmount",
        }),
        threshold() {
            let cssClass = "main-color bold";
            let amount = this.slider ? this.slider.max : 10000;
            return { amount: amount, css: cssClass };
        },
        getCSS() {
            if (this.threshold && this.threshold.amount <= this.money.amount) {
                return this.threshold.css;
            }
            return this.css;
        },
        errorMessage() {
            return this.minAmount > 0
                ? this.$t("amount.error.minAmount", {
                      0: this.minAmount / 100,
                      1: this.money.currency,
                  })
                : this.$t("amount.error.default");
        },
        money: {
            get() {
                return this.$store.state.payment.money;
            },
            set(value) {
                this.$store.commit("payment/money", value);
            },
        },
        current: {
            get() {
                return this.$store.state.payment.amount_type;
            },
            set(value) {
                this.$store.commit("payment/amount_type", value);
            },
        },
    },
    validations() {
        return {
            money: {
                amount: {
                    required,
                    minValue: minValue(this.minAmount),
                },
            },
        };
    },
};
</script>
<style lang="scss" scoped>
.vca-button + .vca-button {
    @include media(large) {
        margin-left: 3em !important;
    }
}

.amount-field {
    margin: 1em auto;
    max-width: 90%;
}

.example-wrapper {
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    flex-shrink: 0;
    padding: 1em;

    @include media(large) {
        padding: 1em 3em 3em 3em;
        max-width: 85%;
        flex-wrap: nowrap;
    }

    .example-image {
        width: 75px;
        height: 75px;
    }

    .example-content {
        color: $main-color;
        padding: 0 0 0 3em;
    }

    + .example-wrapper {
        margin-left: 2em;
    }
}
</style>
