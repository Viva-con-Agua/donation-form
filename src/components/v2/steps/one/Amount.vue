<template>
    <vca-field
        class="typo-roboto"
        id="amount"
        :label="header_text"
    >
        <vca-row>
            <vca-column>
                <div v-if="customized == 'true'">
                <vca-row class="button-wrapper inline-wrapper">
                    <button
                        @click="setAmount(customized_amount.a_1)"
                        class="vca-button selection"
                        :class="{ inactive: !isActive(customized_amount.a_1) }"
                    >
                        {{ customized_amount.a_1 /100 }} €
                    </button>
                    <button
                        @click="setAmount(customized_amount.a_2)"
                        class="vca-button selection"
                        :class="{ inactive: !isActive(customized_amount.a_2) }"
                    >
                        {{ customized_amount.a_2 /100 }} €
                    </button>
                </vca-row>
                <vca-row class="button-wrapper inline-wrapper">
                    <button
                        @click="setAmount(customized_amount.a_3)"
                        class="vca-button selection"
                        :class="{ inactive: !isActive(customized_amount.a_3) }"
                    >
                        {{ customized_amount.a_3 /100}} €
                    </button>
                    <button
                        @click="setAmount('custom')"
                        class="vca-button selection"
                        :class="{ inactive: !isActive('custom') }"
                    >
                        {{ $t("amount.custom") }}
                    </button>
                </vca-row>
                </div>
                <div v-if="customized != 'true' && customized != 'simple'">
                <vca-row class="button-wrapper inline-wrapper">
                    <button
                        @click="setAmount(500)"
                        class="vca-button selection"
                        :class="{ inactive: !isActive(500) }"
                    >
                        5 €
                    </button>
                    <button
                        @click="setAmount(1000)"
                        class="vca-button selection"
                        :class="{ inactive: !isActive(1000) }"
                    >
                        10 €
                    </button>
                </vca-row>
                <vca-row class="button-wrapper inline-wrapper">
                    <button
                        @click="setAmount(1500)"
                        class="vca-button selection"
                        :class="{ inactive: !isActive(1500) }"
                    >
                        15 €
                    </button>
                    <button
                        @click="setAmount('custom')"
                        class="vca-button selection"
                        :class="{ inactive: !isActive('custom') }"
                    >
                        {{ $t("amount.custom") }}
                    </button>
                </vca-row>
                </div>
                <vca-row>
                    <div></div>
                    <vca-money-input
                        v-if="current == 'custom' || customized  == 'simple'"
                        ref="money"
                        v-model="money"
                        class="amount-field"
                        :css="getCSS"
                        :min="minAmount / 100"
                        :threshold="threshold"
                        :rules="$v.money"
                        :errorMsg="errorMessage"
                        :topText="amount_text"
                    />
                    <div v-if="customized == 'simple'"></div>
                </vca-row>
            </vca-column>
            <vca-row v-if="customized != 'simple'">
                <vca-card v-if="current != 'custom' && hasIcon" class="vertical-center">
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
            if ([500, 1000, 1500].includes(this.money.amount)) {
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
            customized: "customized",
            customized_amount: "customized_amount"
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
        hasIcon() {
            var object = this.$t("example.icon")
            if (object[this.money.amount] === undefined) {
                return false
            } else {
                return true
            }
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
                this.$emit("interaction");
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
        amount_text() {
            if (this.customized === "simple") {
                return "Betrag"
            } else {
                return this.$t('amount.toptext')
            }

        },
        header_text() {
            if (this.customized === "simple") {
                return ""
            } else {
                return this.$t('amount.label.donate_2')
            }
        }

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
.inline-wrapper {
    flex-wrap: nowrap;
    button {
        margin: 5px !important;
        @include media(large) {
            margin: 20px 0 !important;
        }
    }
}

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
