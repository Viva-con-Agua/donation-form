<template>
    <vca-field  :label="$t('amount.label')">
        <vca-money-input 
            ref="money"
            v-model="money" 
            :money="money"
            :rules="$v.money" 
            :errorMsg="errorMessage"
            :topText="$t('amount.toptext')"/>
    </vca-field>
</template>
<script>
import { required, minValue } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
export default {
    name: 'Amount',
    props: {
        rules: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    validations() {
        return {
            money: {
                amount: {
                    required,
                    minValue: minValue(this.minAmount)
                }
            }
        }
    },
    methods: {
        validate()  {
            return this.$refs.money.validate()
        }
    },
    computed: {
       ...mapGetters({
           minAmount: 'payment/minAmount'
        }),
        errorMessage() {
            return (this.minAmount > 0) ? this.$t('amount.error.minAmount', {0: this.minAmount / 100, 1: this.money.currency}) : this.$t('amount.error.default')
        },
        money: {
            get () {
                return this.$store.state.payment.money
            },
            set(value) {
                this.$store.commit('payment/money', value)
            }
        }
    }
}
</script>