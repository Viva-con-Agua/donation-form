<template>
    <div class="steptwo">
        <vca-field :label="$t('contacttypeselection.label')">
                <div class="btn-center-container">
                    <button :class="btnSelected('private')" class="selection-button"  @click.prevent="selectCompany(false)">Privatperson</button>
                    <button :class="btnSelected('company')" class="selection-button" @click.prevent="selectCompany(true)">Unternehmen</button>
                </div>
        </vca-field>
    </div>
</template>
<script>

export default {
    name: 'ContactTypeSelect',
    computed: {
        offset: {
            get () {
                return this.$store.state.offset
            },
            set(value) {
                this.$store.commit('offset', value)
            }
        }
    },
    methods: {
        selectCompany(company) {
            this.offset.company = company
        },
        btnSelected(val) {
            if (this.offset.company) {
                return (val == 'company') ? 'selected' : '';
            } else {
                return (val != 'company') ? 'selected' : '';
            }
        }
    }
}
</script>
