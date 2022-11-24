<template>
    <vca-card>
        <vca-field :label="$t('next.label')">
            <div v-if="setting == 'nwt'">
                <p class="text-center" v-html="$t('next.nwt')"></p>
                <br />
            </div>
            <div v-else>
                <p class="text-center" v-html="$t('next.email')"></p>
                <br />
                <p
                    v-if="setting == 'mtg'"
                    class="text-center"
                    v-html="$t('next.receipt_mtg')"
                ></p>
                <p v-else class="text-center" v-html="$t('next.receipt')"></p>
                <br />
                <p class="text-center" v-html="$t('next.newsletter.text')"></p>

                <button
                    v-if="flow"
                    class="vca-button quarter"
                    @click.prevent="submit"
                >
                    {{ $t("next.newsletter.button") }}
                </button>
                <div class="vca-column" v-else>
                    <button
                        class="vca-button quarter"
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
        anonymous: {
            get() {
                return this.$store.state.payment.contact;
            },
            set(value) {
                this.$store.commit("payment/contact", value);
            },
        },
        ...mapGetters({
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
        width: 100% !important;
    }
}
</style>
