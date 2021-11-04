<template>
    <div class="steptwo">
        <vca-field :label="$t('contacttypeselection.label')">
                <div class="selection-button-box">
                    <button :class="btnSelected('private')" class="selection-button"  @click.prevent="isCompany = false">{{ $t('contacttypeselection.individual') }}</button>
                    <button :class="btnSelected('company')" class="selection-button" @click.prevent="isCompany = true">{{ $t('contacttypeselection.company') }}</button>
                </div>
        </vca-field>
    </div>
</template>
<script>

export default {
    name: 'ContactTypeSelect',
    computed: {
        isCompany: {
            get () {
                return this.$store.state.isCompany
            },
            set(value) {
                this.$store.commit('isCompany', value)
            }
        }
    },
    methods: {
        btnSelected(val) {
            if (this.isCompany) {
                return (val == 'company') ? 'selected' : '';
            } else {
                return (val != 'company') ? 'selected' : '';
            }
        }
    }
}
</script>
