<template>
    <div class="stepone">
        <Abo v-if="hasSubscription" />

        <Amount ref="amount" />
        <button
            v-if="showButton"
            class="vca-button navigation"
            @click="submit"
            :disabled="!isValid"
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
        }),
    },
    methods: {
        submit() {
            this.gtmTrack("click", "StepOne Next donation-form", 0);
            this.$emit("submit");
        },
    },
};
</script>
