<template>
    <div class="sepa-payment-container">
        <vca-field label="Weitere Angaben">
            <vca-input
                ref="iban"
                errorMsg="Bitte prüfe deine IBAN"
                placeholder="IBAN"
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
                errorMsg="Bitte bestätige die Ermächtigung">
                        Ich ermächtige Viva con Agua de Sankt Pauli e.V., Zahlungen von meinem Konto mittels Lastschrift einzuziehen. Zugleich weise ich mein Kreditinstitut an, die von Viva con Agua de Sankt Pauli e.V. auf mein Konto gezogene Lastschrift einzulösen.<br>
                        <strong>Hinweis:</strong> Ich kann innerhalb von acht Wochen, beginnend mit dem Belastungsdatum, die Erstattung des belasteten Betrags verlangen. Es gelten dabei die mit meinem Kreditinstitut vereinbarten Bedingungen.
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
                this.$refs.terms.validate()
                this.$emit('isInvalid', this.$v.$invalid)
            }
        }
    },
    methods: {
        isValid() {
            this.$refs.iban.validate()
            this.$emit('isInvalid', this.$v.$invalid)
        }
    }

}
</script>
