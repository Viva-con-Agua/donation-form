<template>
    <vca-field v-if="abo"  :label="$t('interval.label')">

        <div class="btn-flex-container">
            <IntervalButton interval='monthly' :drops="1" />
            <IntervalButton interval='half' :drops="2" />
            <IntervalButton interval='thrice' :drops="3" />
            <IntervalButton interval='quarterly' :drops="4" />
        </div>


    </vca-field>
</template>
<script>
import { mapGetters } from 'vuex'
import IntervalButton from '@/components/membership/IntervalButton'
export default {
    name: 'Interval',
    components: {IntervalButton},
    computed: {
        ...mapGetters({
            abo: 'transaction/abo'
        }),
        transaction: {
            get () {
                return this.$store.state.transaction
            },
            set(value) {
                this.$store.commit('transaction', value)
            }
        }
    },
    methods: {
        dropSelected(val) {
            return (this.transaction.interval == val) ? 'btn-drop-selected' : ''
        }    
    }
}
</script>