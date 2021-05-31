<template>
    <vca-field class="typo-roboto" :label="$t('abo.label')">
        <vca-selection :selection="abos" v-model="abo"/>
    </vca-field>
</template>
<script>
export default {
    name: 'Abo',
    data() {
        return {
            abos: [
                { label: this.$t("abo.no"), value: 'no' },
                { label: this.$t("abo.yes"), value: 'yes' }
            ]
        }
    },
    computed: {
        abo: {
            get () {
                return (this.$store.state.transaction.abo) ? 'yes' : 'no'
            },
            set(value) {
                this.$store.commit('transaction/abo', value == 'yes')
            }
        }
    }
}
</script>