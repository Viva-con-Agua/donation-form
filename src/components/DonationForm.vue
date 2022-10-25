<template>
    <div>
        <vca-loading v-if="loadingFlow" />
        <div v-if="iserror">
            <Headline :text="$t('error.not_found.headline')" />
            <vca-card v-html="$t('error.not_found.text')"></vca-card>
        </div>
        <div v-else :class="{ 'mtg-theme': setting == 'mtg' }">
            <div v-if="setting != 'v2'">
                <Headline :text="getText" />
                <Slider v-if="step === 4" />
                <HeaderStepsMtg
                    v-if="setting == 'mtg'"
                    :currentStep="step"
                    :steps="steps"
                />
                <HeaderSteps v-else :currentStep="step" :steps="steps" />
                <div class="vca-card vca-border" id="topElement">
                    <StepOne v-if="step === 1" @submit="navigate(), step++" />
                    <StepTwo
                        v-if="step === 2"
                        @submit="navigate(), step++"
                        @back="navigate(), step--"
                    />
                    <StepThree
                        v-if="step === 3"
                        ref="stepthree"
                        :product="product"
                        @back="navigate(), step--"
                        @success="success"
                    />
                    <StepThanks v-if="step === 4" />
                </div>
                <PaymentFooter v-if="step < 4" />
            </div>
            <div v-else class="v2">
                <div id="topElement"></div>
                <HeaderSteps
                    :currentStep="step"
                    :steps="steps_v2"
                    v-if="step < 3"
                />
                <StepOneV2
                    v-if="step === 1"
                    :showButton="!next"
                    @submit="next = true"
                />
                <StepTwoV2
                    v-if="step === 1 && next == true"
                    @submit="navigate(), step++"
                    @back="next = false"
                />
                <StepThreeV2
                    v-if="step === 2"
                    ref="stepthree"
                    :product="product"
                    @back="
                        step--;
                        next = true;
                    "
                    @success="step++"
                />
                <Slider v-if="step === 3" />
                <StepThanksV2 v-if="step === 3" />

                <vca-popup
                    :show="showInfo"
                    @close="showInfo = false"
                    :title="$t('information.label')"
                    ><PaymentFooter :showSSL="true" />
                </vca-popup>
                <img
                    v-if="step < 3"
                    src="@/assets/icons/info.png"
                    @click="showInfo = true"
                    class="infobox"
                />
            </div>
        </div>
    </div>
</template>
<script>
//import axios from 'axios'
import StepOne from "@/components/steps/StepOne";
import StepOneV2 from "@/components/v2/StepOne";
import StepTwoV2 from "@/components/v2/StepTwo";
import StepThreeV2 from "@/components/v2/StepThree";
import StepThanksV2 from "@/components/v2/StepThanks";
import StepTwo from "@/components/steps/StepTwo";
import StepThree from "@/components/steps/StepThree";
import StepThanks from "@/components/steps/StepThanks";
import Slider from "@/components/steps/four/Slider";
import PaymentFooter from "@/components/layout/Footer";
import HeaderSteps from "@/components/layout/HeaderSteps";
import HeaderStepsMtg from "@/components/layout/HeaderStepsMtg";
//import LanguageSelection from "@/components/utils/LanguageSelection"
import Headline from "@/components/layout/Headline";
import { mapGetters } from "vuex";
export default {
    name: "DonationForm",
    components: {
        Slider,
        StepOne,
        StepOneV2,
        StepTwoV2,
        StepThreeV2,
        StepThanksV2,
        StepTwo,
        StepThree,
        StepThanks,
        PaymentFooter,
        HeaderSteps,
        HeaderStepsMtg,
        Headline,
    },
    props: {
        donation_form_id: {
            type: String,
            default: "",
        },
        lang: {
            type: String,
            default: "de",
        },
        setting: {
            type: String,
            default: "de",
        },
        email: {
            type: String,
            default: null,
        },
        amount: {
            type: String,
            default: "",
        },
        interval: {
            type: String,
            default: "",
        },
    },
    created() {
        this.$store.commit("loadingFlow");
        this.$store.commit("setting", this.setting);

        if (this.email) {
            this.$store.commit("payment/email", this.email);
        }

        if (this.setting == "v2") {
            this.$store.commit("payment/money", {
                currency: this.money.currency,
                amount: 2500,
            });
        }
        this.defaultLanguage(this.lang);

        this.steps = [
            { id: 1, label: this.$t("header.amount") },
            { id: 2, label: this.$t("header.contact") },
            { id: 3, label: this.$t("header.payment") },
            { id: 4, label: this.$t("header.thanks") },
        ];
        this.steps_v2 = [
            { id: 1, label: this.$t("header.data") },
            { id: 2, label: this.$t("header.payment") },
            { id: 3, label: this.$t("header.thanks") },
        ];
        this.$store
            .dispatch({ type: "init", data: this.donation_form_id })
            .then((resp) => {
                if (this.setting != "v2") {
                    let next = 0;
                    if (this.amount && this.amount >= this.minAmount) {
                        this.$store.commit("payment/money", {
                            amount: this.amount,
                        });
                        next++;
                    }

                    if (
                        this.interval &&
                        [
                            "once",
                            "monthly",
                            "quarterly",
                            "half",
                            "yearly",
                        ].includes(this.interval)
                    ) {
                        next++;

                        if (this.interval != "once") {
                            this.$store.commit("payment/abo", true);
                            this.$store.commit(
                                "payment/interval",
                                this.interval
                            );
                        }
                    }
                    if (next == 2) {
                        this.step = 2;
                    }
                }
                console.log(resp);
            })
            .catch((error) => {
                this.iserror = true;
                console.log(error);
            })
            .finally(this.$store.commit("loadingFlow"));
    },
    data() {
        return {
            showInfo: false,
            next: false,
            iserror: false,
            step: 1,
            steps: [],
            steps_v2: [],
        };
    },
    computed: {
        ...mapGetters({
            product: "form/product",
            minAmount: "form/minAmount",
            money: "payment/money",
            loadingFlow: "loadingFlow",
        }),
        getText() {
            if (this.setting == "nwt") {
                return this.$t("headline.nwt");
            } else if (this.setting == "mtg") {
                return this.$t("headline.mtg");
            } else {
                return this.step == 4
                    ? this.$t("headline.thanks")
                    : this.$t("headline.donate");
            }
        },
    },
    methods: {
        defaultLanguage(language) {
            localStorage.language = language;
            this.$i18n.locale = language;
            this.language = language;
        },
        navigate() {
            var top = document.getElementById("topElement").offsetTop;
            window.scrollTo(0, top);
            window.top.postMessage("navigate", "*");
        },
        success() {
            this.$emit("success");
            //this.$refs.stepthree.commit()
            this.step = 4;
        },
    },
};
</script>
<style lang="scss">
.desktop-view {
    display: block;
    @include media(500px) {
        display: none;
    }
}
.checkbox-text {
    @include media(small) {
        font-size: 0.85em;
    }
}
.vca-field .vca-field-label label {
    font-size: 1em !important;
    @include media(large) {
        font-size: 1.25em !important;
    }
}
.mobile-view {
    display: none;
    @include media(small) {
        display: contents;
    }
}
.vca-card,
.vca-field {
    @include media(small) {
        padding: 0.3em !important;
    }
}
.arr-btn-box {
    width: max-content;
}

.v2 {
    .button-wrapper {
        padding: 0 1em;
        @include media(large) {
            padding: 0;
        }
    }
    .vca-button {
        &.selection {
            margin: 5px auto;
            border: solid thin $main-color;
            padding: 5px;
            max-width: 70%;

            @include media(large) {
                padding: 20px;
                margin: 20px 0;
            }

            &.inactive {
                background-color: white;
                border: solid thin $main-color;
                color: $main-color;

                &:hover {
                    border: solid thin $primary-dark;
                    color: $primary-dark;
                }
            }
        }
        &.navigation {
            background-color: $mtg-main;
            min-width: 20%;
            width: auto;

            &:hover {
                background-color: $orange-dark;
            }
            &:disabled {
                opacity: 0.5;
            }
        }
    }
    .infobox {
        z-index: +1;
        position: absolute;
        width: 30px;
        height: 30px;
        bottom: 5%;
        right: 10px;
        cursor: pointer;
        @include media(large) {
            width: 50px;
            height: 50px;
            right: 25px;
        }
    }
}
</style>
