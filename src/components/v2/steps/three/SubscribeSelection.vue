<template>
    <div>
        <vca-field :label="$t('paymentselection.label.donate')">
            <div class="selection-button-box">
                <button
                    v-for="(current, index) in paymentTypes"
                    :key="index"
                    :class="{ selected: getPaymentType(current.name) }"
                    class="selection-button button-wrapper"
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

        <StripeSubscriptionSepa
            v-if="getPaymentType('sepa')"
            ref="sepa"
            @success="success"
            :product="product"
            v-on:error="error"
            @isInvalid="isInvalid"
        />
        <CiviSubsciptionSEPA
            v-if="getPaymentType('civisepa')"
            v-on:error="error"
            @isInvalid="isInvalid"
        />
        <StripeSubscriptionCreditCard
            v-if="getPaymentType('creditcard')"
            @success="success"
            ref="creditcard"
            :product="product"
            v-on:error="error"
            @isInvalid="isInvalid"
        />
        <PayPalButton
            v-if="getPaymentType('paypal')"
            ref="paypal"
            v-on:success="success"
            v-on:error="error"
        />
    </div>
</template>
<script>
import CiviSubsciptionSEPA from "@/components/payment/civi/CiviSubscriptionSEPA";
import StripeSubscriptionSepa from "@/components/payment/stripe/StripeSubscriptionSepa";
import PayPalButton from "@/components/payment/paypal/PayPalSubscriptionButton";
import StripeSubscriptionCreditCard from "@/components/payment/stripe/StripeSubscriptionCreditCard";

import { mapGetters } from "vuex";

export default {
    name: "SubscribeSelection",
    components: {
        StripeSubscriptionSepa,
        CiviSubsciptionSEPA,
        StripeSubscriptionCreditCard,
        PayPalButton,
    },
    props: ["product"],
    computed: {
        ...mapGetters({
            paymentTypes: "form/subscriptionTypes",
        }),
        paymentType: {
            get() {
                return this.$store.state.payment.payment_type;
            },
            set(value) {
                this.$store.commit("payment/payment_type", value);
            },
        },
    },
    created() {
        let filter = this.paymentTypes.find((el) => el.default);
        this.paymentType = filter ? filter.name : this.paymentTypes[0].name;
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
            this.commit("payment/payment_type", val);
            this.$emit("paymentType", val);
        },
        commit() {
            if (this.getPaymentType("creditcard")) {
                this.$refs.creditcard.purchase();
            } else if (this.getPaymentType("paypal")) {
                this.$refs.paypal.purchase();
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
            border: solid 6px $primary-dark;
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
