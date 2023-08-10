<template>
    <div class="stepone">
        <Abo @interaction="interaction" v-if="hasSubscription && customized != 'simple'" />

        <Amount @interaction="interaction" ref="amount" />
        <button
            v-if="showButton"
            class="vca-button navigation"
            @click="submit"
            :disabled="!isValid"
            v-observe-visibility="visibilityChanged"
        >
            {{ $t("buttons.next") }}
        </button>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import Amount from "@/components/v2/steps/one/Amount.vue";
import Abo from "@/components/v2/steps/one/Abo.vue";
export default {
    name: "StepOneV2",
    components: { Amount, Abo },
    props: {
        showButton: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            isValid: true,
        };
    },
    mounted() {
        this.isValid = !this.$refs.amount.$v.$invalid;
        this.$watch(
            () => {
                return this.$refs.amount.$v.$invalid;
            },
            (val) => {
                this.isValid = !val;
            }
        );
    },
    computed: {
        hasSubscription() {
            return (
                this.$store.state.form.current.subscription_types != null &&
                this.$store.state.form.current.subscription_types.length > 0
            );
        },
        ...mapGetters({
            setting: "setting",
            money: "payment/money",
            interval: "payment/interval",
            interval_type: "payment/interval_v2",
            trackingData: 'payment/trackingData',
            customized: 'customized'
        }),
    },
    methods: {
        interaction() {
            const message = {
                type: "data-update",
                data: {
                    amount: this.money.amount,
                    interval:
                        this.interval_type == "single" ? "once" : this.interval,
                },
            };
            parent.postMessage(message, "*");
            console.debug("message sent with: ", message.data);
        },
        submit() {
            this.$store.commit("payment/trackingData", "view_donation_form_step2")
            var data = this.trackingData
            this.trackingTrigger(data)
            this.gtmTrack("click", "StepOne Next donation-form", 0);
            this.$emit("submit");
        },
        visibilityChanged (isVisible, entry) {
            this.isVisible = isVisible
            if (entry.isIntersecting && !this.tracked) {
                this.tracked = true
                this.trackingTrigger(this.trackingData)
            }
        }
    },
};
</script>
