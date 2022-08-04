<template>
    <div>
        <vca-field :label="getLabel">
            <div class="selection-button-box">
                <button
                    v-for="(current, index) in paymentTypes"
                    :key="index"
                    :class="{ selected: getPaymentType(current.name) }"
                    class="selection-button"
                    @click.prevent="setPaymentType(current.name)"
                >
                    <div v-if="!getPaymentImage(current.name)">
                        {{ $t(current.title) }}
                    </div>
                    <div v-else>
                        <img
                            :src="getPaymentImage(current.name)"
                            class="paymenttype-icon"
                        />
                    </div>
                </button>
            </div>
        </vca-field>

        <StripePaymentSepa
            v-if="getPaymentType('sepa')"
            ref="sepa"
            :product="product"
            @success="success"
            @isInvalid="isInvalid"
            v-on:error="error"
        />
        <CiviPaymentSEPA
            v-if="getPaymentType('civisepa')"
            @isInvalid="isInvalid"
            @success="success"
            v-on:error="error"
        />
        <StripePaymentCreditCard
            v-if="getPaymentType('creditcard')"
            @success="success"
            ref="creditcard"
            :product="product"
            @isInvalid="isInvalid"
            v-on:error="error"
        />
        <PayPalButton
            v-if="getPaymentType('paypal')"
            @success="success"
            v-on:error="error"
        />
    </div>
</template>
<script>
import CiviPaymentSEPA from "@/components/payment/civi/CiviPaymentSEPA";
import StripePaymentSepa from "@/components/payment/stripe/StripePaymentSepa";
import PayPalButton from "@/components/payment/paypal/PayPalCheckoutButton";
import StripePaymentCreditCard from "@/components/payment/stripe/StripePaymentCreditCard";

import { mapGetters } from "vuex";

export default {
    name: "PaymentSelection",
    components: {
        StripePaymentSepa,
        CiviPaymentSEPA,
        StripePaymentCreditCard,
        PayPalButton,
    },
    props: ["product"],
    computed: {
        ...mapGetters({
            setting: "setting",
            paymentTypes: "form/paymentTypes",
        }),
        getLabel() {
            if (this.setting == "nwt") {
                return this.$t("paymentselection.label.pay");
            } else {
                return this.$t("paymentselection.label.donate");
            }
        },
        paymentType: {
            get() {
                return this.$store.state.payment.payment_type;
            },
            set(value) {
                this.$store.commit("payment/payment_type", value);
            },
        },
    },
    methods: {
        getPaymentImage(type) {
            if (["creditcard", "paypal", "sepa"].includes(type)) {
                return require("@/assets/img/payment/" + type + ".png");
            }
            return false;
        },
        getWhitePaymentImage(type) {
            if (["creditcard", "paypal", "sepa"].includes(type)) {
                return require("@/assets/img/payment/" + type + "_white.png");
            }
        },
        isInvalid(e) {
            this.$emit("isInvalid", e);
        },
        success() {
            this.$emit("success");
        },
        error(e) {
            this.$emit("error", e);
        },
        getPaymentType(val) {
            return this.paymentType == val;
        },
        setPaymentType(val) {
            this.paymentType = val;
            //    this.commit('payment/payment_type', val)
            this.$emit("paymentType", val);
        },
        commit() {
            if (this.getPaymentType("creditcard")) {
                this.$refs.creditcard.purchase();
            } else if (this.getPaymentType("sepa")) {
                this.$refs.sepa.purchase();
            }
        },
    },
};
</script>
<style lang="scss">
.v2 {
    .selection-button {
        .paymenttype-icon {
            display: inline-block !important;
            margin-left: 15px;
        }
        &.selected {
            border: solid 2px $primary-dark;
            background-color: $white;
            color: $primary-dark;
        }
        &:hover {
            color: $primary-dark !important;
            background-color: $white !important;
        }
    }
}
</style>
