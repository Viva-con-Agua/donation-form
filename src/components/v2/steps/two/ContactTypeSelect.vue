<template>
    <div class="steptwo">
        <vca-field :label="$t('contacttypeselection.label')">
            <vca-row class="button-wrapper vca-center">
                <button
                    :class="btnSelected('private')"
                    class="vca-button selection"
                    @click.prevent="isCompany = false"
                >
                    {{ $t("contacttypeselection.individual") }}
                </button>
                <button
                    :class="btnSelected('company')"
                    class="vca-button selection"
                    @click.prevent="isCompany = true"
                >
                    {{ $t("contacttypeselection.company") }}
                </button>
            </vca-row>
        </vca-field>
    </div>
</template>
<script>
export default {
    name: "ContactTypeSelect",
    computed: {
        isCompany: {
            get() {
                return this.$store.state.isCompany;
            },
            set(value) {
                this.$store.commit("isCompany", value);
            },
        },
    },
    methods: {
        btnSelected(val) {
            if (this.isCompany) {
                return val == "company" ? "" : "inactive";
            } else {
                return val != "company" ? "" : "inactive";
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.vca-button {
    margin: 10px !important;
}
</style>
