<template>
    <vca-card>
        <vca-field :label="$t('next.label')">
            <div class="button-wrapper">
                <p class="text-center" v-html="$t('next.email')"></p>
                <br />
                <p
                    v-if="setting == 'mtg'"
                    class="text-center"
                    v-html="$t('next.receipt_mtg')"
                ></p>
                <p v-else class="text-center" v-html="$t('next.receipt')"></p>
                <br />
                <p class="text-center">{{ $t("next.newsletter.text") }}</p>

                <button
                    v-if="flow"
                    class="vca-button quarter navigation"
                    @click.prevent="submit"
                >
                    {{ $t("next.newsletter.button") }}
                </button>
                <div class="vca-column" v-else>
                    <button
                        class="vca-button quarter navigation"
                        disabled
                        @click.prevent="submit"
                    >
                        {{ $t("next.newsletter.button") }}
                    </button>
                    <div
                        class="
                            primary-dark
                            bold
                            tenseconds-success
                            vca-border
                            text-center
                        "
                    >
                        {{ $t("next.newsletter.success") }}
                    </div>
                </div>
                <p
                    v-if="setting == 'mtg'"
                    class="text-center"
                    v-html="$t('next.yours_mtg')"
                ></p>
                <p v-else class="text-center" v-html="$t('next.yours')"></p>
            </div>
            <vca-share-icons :share="shareObject" />
        </vca-field>
    </vca-card>
</template>

<script>
import { mapGetters } from "vuex";
import { required, email } from "vuelidate/lib/validators";
export default {
    name: "Next",
    data() {
        return {
            flow: true,
        };
    },
    computed: {
        shareObject() {
            return {
                media: ["whatsapp", "telegram", "twitter", "device"],
                url:
                    window.location != window.parent.location
                        ? document.referrer
                        : document.location.href,
                text: this.$t("thanks.share", { 0: this.getAmount }),
            };
        },
        getAmount() {
            return (
                this.toLocaleString(this.money.amount / 100) +
                " " +
                this.money.currency
            );
        },
        anonymous: {
            get() {
                return this.$store.state.payment.contact;
            },
            set(value) {
                this.$store.commit("payment/contact", value);
            },
        },
        ...mapGetters({
            money: "payment/money",
            setting: "setting",
        }),
    },
    validations() {
        return {
            anonymous: {
                email: {
                    email,
                    required,
                },
            },
        };
    },
    methods: {
        submit() {
            this.gtmTrack(
                "click",
                "StepFour Newsletter-Subscription donation-form",
                0
            );
            this.$store
                .dispatch({ type: "newsletter" })
                .then((resp) => {
                    console.log(resp);
                    this.flow = false;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>
<style lang="scss" scoped>
.quarter {
    @include media(small) {
        width: 75% !important;
    }
}
</style>
<style lang="scss">
.shareLinks {
    margin-top: 1em;
}
</style>
