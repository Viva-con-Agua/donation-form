<template>
    <vca-card>
        <div v-if="setting != 'nwt'">
            <h1 class="text-center">{{ $t('thanks.header') }}</h1>
            <h2 class="text-center">{{ $t('thanks.subheader') }}</h2>
        </div>
        <div vif="setting == 'nwt'">
            <h2 class="text-center">{{ $t('nwt.thanks.subheader')}}</h2>
        </div>
        <p class="text-center" v-if="getExample && setting != 'nwt'">{{ $t('thanks.text', {0: getAmount, 1: getExample}) }}</p>
    </vca-card>
 </template> 

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Thanks',
    computed: {
       ...mapGetters({
           money: 'payment/money',
           setting: 'setting',
           examples: 'company/examples'
        }),
        getAmount() {
          return this.toLocaleString(this.money.amount / 100) + ' ' + this.money.currency
        },
        getExample() {
            if (!this.examples) {
              return this.$t('example.default')
            }

            let res = this.examples.filter(t => this.money.amount >= t.value)
            return (res.length > 0) ? this.$t('thanks.' + res[0].message) : this.$t('example.default')

        }
   }
}
</script>
