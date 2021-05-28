<template>
    <button class="btn-drop btn-flex-box" :class="dropSelected(interval)" @click.prevent="transaction.interval = interval">
        <div v-if="transaction.interval != interval" >
            <img v-for="index in drops" :key="index" src="~@/assets/icons/icon_vca.png"/>
        </div>
        <div v-else>
            <img v-for="index in drops" :key="index" src="~@/assets/icons/icon_vca_white.png"/>
        </div>
        <span class="btn-amount">{{ $t('interval.' + interval ) }}</span>
    </button>
</template>
<script>
export default {
    name: 'IntervalButton',
    props: {
        interval: {
            type: String,
            default: 'monthly'
        },
        drops: {
            type: Number,
            default: 1
        }
    },
    computed: {
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