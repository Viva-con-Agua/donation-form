<template>
    <vca-card>
            <div class="button-wrapper">
                <div class="container">
                    <div class="block">

                        <img style="width: 100%;" src="@/assets/img/ThanksPageNewsletter.png" />
                    </div>
                    <div class="block">

                <p>{{ $t('thanks.newsletter_text') }}</p>
                <br />

                <button
                    v-if="flow"
                    class="vca-button"
                    @click.prevent="submit"
                >
                    {{ $t("next.newsletter.button") }}
                    <div class="btnBg"></div>
                </button>

                <div class="vca-column" v-else>
                    <button
                        class="vca-button nl-button"
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
                    </div>
                </div>
            </div>
            <vca-share-icons :share="shareObject" />
    </vca-card>
</template>

<script>
import { mapGetters } from "vuex";
import { required, email } from "vuelidate/lib/validators";
export default {
    name: "Newsletter",
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
            this.trackingTrigger({event: "signup_newsletter", source: "donation_form"})
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
.container {
    display: flex;
    flex-direction: row;
    gap: 5em;
    align-items: center;
}
.nl-button {
    background-color: transparent;
  display: block;
  margin: 1em auto;
  font-size: 1em;
  width: 100%;
  height: auto;
  line-height: 2em;
  color: #fff;
  padding: .5em 1.2em;
  border: 0;
  text-transform: uppercase;
  font-weight: 700;
  text-decoration: none;
  position: relative;
}
.btnBg {
    position: absolute;
    background-color: $primary-dark;
    top:0;
    bottom: 0;
    z-index: -1;
}
.btnBg:after{
    background-image: url('~@/assets/img/btnBgRight.svg');
    right: -44px;
    content: "";
    width: 55px;
  }
.block {
    flex-basis: 50%;
    font-size: 0.86em;
}
</style>
