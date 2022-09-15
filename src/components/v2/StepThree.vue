<template>
    <div class="steptwo">
        <div v-if="errorMSG">
            <h2>Payment_id: {{ payment }}</h2>
            <span>{{ $t("error.payment") }}</span>
        </div>
        <PaymentSelection v-if="!abo" ref="selection" :product="product" class="button-wrapper" v-on:success="success"
            v-on:error="error" @isInvalid="validate" />
        <SubscribeSelection v-if="abo" ref="selection" :product="product" v-on:success="success" v-on:error="error"
            @isInvalid="validate" />
        <div class="button-wrapper">
            <Policies v-if="paymentType != ''" />
        </div>
        <button v-if="paymentType == 'paypal'" class="vca-button navigation" @click="back">
            {{ $t("buttons.back") }}
        </button>

        <div v-else class="inline-navigation vca-center button-wrapper">
            <div>
                <button class="vca-button navigation" @click="back">
                    {{ $t("buttons.back") }}
                </button>
            </div>
            <div>
                <button class="vca-button navigation" @click="commit" :disabled="isInvalid">
                    {{ getLabel }}
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import PaymentSelection from "@/components/v2/steps/three/PaymentSelection";
import SubscribeSelection from "@/components/v2/steps/three/SubscribeSelection";
import Policies from "@/components/v2/steps/three/Policies";
import Money from "vca-ui/src/utils/Money";
import { mapGetters } from "vuex";
export default {
    name: "StepThreeV2",
    props: ["product"],
    components: { PaymentSelection, SubscribeSelection, Policies },
    data() {
        return {
            isInvalid: true,
            errorMSG: false,
        };
    },
    computed: {
        ...mapGetters({
            setting: "setting",
            payment: "payment/payment_id",
            money: "payment/money",
            abo: "payment/abo",
            paymentType: "payment/payment_type",
        }),
        getLabel() {
            if (this.setting == "nwt") {
                return this.$t("payment.submit.pay", {
                    0: Money.convertDE(this.money.amount),
                    1: this.money.currency,
                });
            } else {
                return this.$t("payment.submit.donate", {
                    0: Money.convertDE(this.money.amount),
                    1: this.money.currency,
                });
            }
        },
    },
    methods: {
        success() {
            if (this.paymentType != "paypal") {
                this.$store.commit("loadingFlow");
            }
            this.$emit("success");
        },
        error(e) {
            if (this.paymentType != "paypal") {
                this.$store.commit("loadingFlow");
            }
            this.notification({
                title: "Error",
                body: "Spende nicht möglich. Danke fürs Testen! Schreib uns bitte die PaymentID",
                type: "error",
            });
            this.errorMSG = true;
            this.$emit("error", e);
        },
        validate(e) {
            this.isInvalid = e;
        },
        commit() {
            this.$store.commit("loadingFlow");
            this.gtmTrack(
                "click",
                "StepTree Donate donation-form",
                this.money.amount / 100
            );
            this.$refs.selection.commit();
        },
        back() {
            this.$emit("back");
        },
    },
};
</script>

<style lang="scss" scoped>
.inline-navigation {
    display: flex;
    flex-wrap: wrap-reverse;

    button {
        margin: 1em !important;
    }
    @include media(large) {
        flex-wrap: nowrap;

        div {
            display: flex;
            width: 100%;

            button {
                margin: 1em !important;
            }

            &:first-of-type {
                justify-content: flex-end;
            }
        }
    }
}
</style>
