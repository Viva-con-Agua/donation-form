<template>
    <div class="sepa-payment-container">
        <vca-input
            ref="account.iban"
            errorMsg="Bitte prüfe deine IBAN"
            placeholder="IBAN"
            v-model.trim="account.iban"
            @input="isValid"
            :rules="$v.account.iban">
        </vca-input>

        <vca-field  v-if="isDE" label="Weitere Angaben">
            <vca-checkbox
                :rules="$v.accept"
                ref="accept"
                v-model="accept"
                errorMsg="Bitte bestätige die Ermächtigung">
                        Ich ermächtige Viva con Agua de Sankt Pauli e.V., Zahlungen von meinem Konto mittels Lastschrift einzuziehen. Zugleich weise ich mein Kreditinstitut an, die von Viva con Agua de Sankt Pauli e.V. auf mein Konto gezogene Lastschrift einzulösen.<br>
                        <strong>Hinweis:</strong> Ich kann innerhalb von acht Wochen, beginnend mit dem Belastungsdatum, die Erstattung des belasteten Betrags verlangen. Es gelten dabei die mit meinem Kreditinstitut vereinbarten Bedingungen.
            </vca-checkbox>
        </vca-field>
        <button type="button" v-on:click.self.prevent="purchase" :disabled="$v.$invalid" class="sepa-donation-button"> {{ label }} </button>
    </div>
</template>

<script>

import axios from 'axios'
export default {
    name: 'CiviSEPA',
    props: ['payment', 'valid', 'label', 'country'],
    data() {
        return {
            accept: false,
            account: {
                iban: '',
                bic: ''
            },
            localPayment: this.payment
        }
    },
    validations() {
        return {
            accept: {
                watcher: value => value === true
            },
            account: {
                iban: {
                    async isinvalid (value) {
                        if (value.length < 15) {
                            return false
                        }  

                        const response = await axios.get("https://openiban.com/validate/" + value + "?getBIC=true&validateBankCode=true")

                        if(response.data.valid) {
                            this.account.bic = response.data.bankData.bic
                        } else {
                            this.account.bic = ''
                        }
                        return Boolean(await response.data.valid)
                    }
                }
            }
        }
    },
    computed: {
        isCH() {
            return this.country == 'CH'
        },
        isAT() {
            return this.country == 'AT'
        },
        isDE() {
            return this.country == 'DE'
        }
    },
    methods: {

        isValid() {
            if (!this.$v.account.iban.$invalid) {
                this.$refs.account.iban.validate()
            }
        },
        purchase () {
            if (this.valid.$invalid === false ) {
                this.localPayment.transaction.id = ""
                this.localPayment.transaction.provider = ""
                this.localPayment.transaction.payment_type = "sepa"
                this.localPayment.transaction.account.iban = this.account.iban
                this.localPayment.transaction.account.bic = this.account.bic
                this.$emit('success', this.localPayment)
            } else {
                if (this.isDE) {
                    this.$refs.accept.validate()
                    this.$refs.account.iban.validate()
                }
                this.$emit('notValid')
            }
        }
    }

}
</script>
