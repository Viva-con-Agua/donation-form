<template>
    <div class="sepa-payment-container">
        <vca-field :label="$t('payment.more_details')">
            <vca-input
                ref="iban"
                :errorMsg="$t('payment.sepa.error')"
                :placeholder="$t('payment.sepa.placeholder')"
                v-model.trim="iban"
                @input="isValid"
                @blur="isValid"
                :rules="$v.iban">
            </vca-input>

            <vca-checkbox
                :rules="$v.terms"
                ref="terms"
                v-model="terms"
                @change="isValid"
                :errorMsg="$t('payment.terms.sepa.error')">
                        <div v-html="$t('payment.terms.sepa.de.single')"></div>
            </vca-checkbox>
        </vca-field>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'CiviSEPA',
    validations() {
        return {
            terms: {
                watcher: value => value === true
            },
            iban: {
                async isinvalid (value) {
                    if (value && value.length >= 15) {
                        const response = await axios.get("https://openiban.com/validate/" + value + "?getBIC=true&validateBankCode=true")
                        if(response.data.valid) {
                            this.bic = response.data.bankData.bic
                        }
                        return Boolean(await response.data.valid)
                    }
                    return false
                }
            }
        }
    },
    created() {
        this.$store.commit('transaction/payment_type', 'civisepa')
        this.$store.commit('transaction/provider', '')
        this.$emit('isInvalid', this.$v.$invalid)
    },
    computed: {
        iban: {
            get () {
                return this.$store.state.transaction.account.iban
            },
            set(value) {
                this.$store.commit('transaction/iban', value)
            }
        },
        bic: {
            get () {
                return this.$store.state.transaction.account.bic
            },
            set(value) {
                this.$store.commit('transaction/bic', value)
                this.$emit('isInvalid', this.$v.$invalid)
            }
        },
        terms: {
            get () {
                return this.$store.state.transaction.terms
            },
            set(value) {
                this.$store.commit('transaction/terms', value)
                this.$emit('isInvalid', this.$v.$invalid)
            }
        }
    },
    methods: {
        isValid() {
            this.$emit('isInvalid', this.$v.$invalid)
        }
    }

}
</script>
