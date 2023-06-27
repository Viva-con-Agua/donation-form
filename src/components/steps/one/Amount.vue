<template>
    <vca-field class="typo-roboto" :label="getLabel">
        <vca-money-input
            ref="money"
            v-model="money"
            :css="getCSS"
            :min="minAmount / 100"
            :threshold="threshold"
            :rules="$v.money"
            :errorMsg="errorMessage"
            :topText="$t('amount.toptext')"/>
    </vca-field>
</template>
<script>
//import VcaMoneyInput from '@/../../vca-ui/src/form/VcaMoneyInput.vue'
import { required, minValue } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
export default {
    name: 'Amount',
//    components: {VcaMoneyInput},
    props: {
        rules: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            css: "grey bold"
        }
    },
    computed: {
       ...mapGetters({
           slider: 'form/slider',
           setting: 'setting',
           minAmount: 'form/minAmount'
        }),
        getLabel() {
            if (this.setting == 'nwt') {
                return this.$t('amount.label.pay')
            } else {
                return this.$t('amount.label.donate')
            }
        },
        threshold() {
            let cssClass = "main-color bold"
            let amount = this.slider ? this.slider.max : 10000
            return { amount: amount, css: cssClass }
        },
        getCSS() {
            if (this.threshold && this.threshold.amount <= this.money.amount) {
                return this.threshold.css
            }
            return this.css
        },
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
    }
}
</script>
