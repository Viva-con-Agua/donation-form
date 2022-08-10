<template>
    <vca-field class="typo-roboto" :label="$t('abo.label')">
        <vca-row class="button-wrapper">
            <button
                @click="current = 'single'"
                class="vca-button selection"
                :class="{ inactive: current != 'single' }"
            >
                {{ $t("abo.single") }}
            </button>
            <button
                @click="current = 'monthly'"
                class="vca-button selection"
                :class="{ inactive: current != 'monthly' }"
            >
                {{ $t("abo.monthly") }}
            </button>
            <button
                @click="current = 'yearly'"
                class="vca-button selection"
                :class="{ inactive: current != 'yearly' }"
            >
                {{ $t("abo.yearly") }}
            </button>
        </vca-row>
    </vca-field>
</template>
<script>
import VueScrollTo from "vue-scrollto";
export default {
    name: "Abo",
    data() {
        return {
            abos: [
                { label: this.$t("abo.no"), value: "no" },
                { label: this.$t("abo.yes"), value: "yes" },
            ],
        };
    },
    computed: {
        current: {
            get() {
                return this.$store.state.payment.interval_v2;
            },
            set(value) {
                VueScrollTo.scrollTo("#amount");
                console.log("current");
                this.$store.commit("payment/interval_v2", value);
                if (value == "single") {
                    this.$store.commit("payment/abo", false);
                } else {
                    this.$store.commit("payment/abo", true);
                    this.$store.commit("payment/interval", value);
                }
            },
        },
    },
};
</script>
