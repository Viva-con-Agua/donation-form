<template>
    <div class="field money">
        <input ref="ta" v-model="displayAmount" :placeholder="label" :disabled="disabled" @change="change">
        <select v-model="amount.currency"  class="currency-select">
            <option label="€" value="EUR">€</option>
            <option label="$" value="USD">$</option>
            <option label="Fr" value="CHF">Fr</option>
        </select>
    </div>
</template>

<script>

import Money from '@/utils/Money'
export default {
    name: "MoneyInput",
    props: {
        amount: {
            type: Object,
            default: function () {
                return {
                    "amount": 1233,
                    "currency": "EUR"
                }
            }
        },
        rules: {
            type: Array,
            default: () => [{
                validator: () => false,
                msg: ""
            }]
        },
        label: {
            "type": String,
            "default": ""
        },
        disabled: {
            "type": Boolean,
            "default": false
        },
        size: {
            type: String,
            default: "medium"
        }
    },
    data () {
        return {
            "amountErrorState": false,
            "errorMsg": 'donation.hints.error.amount.pattern'
        }
    },
    computed: {
        displayAmount: {
            get: function () { 
                return Money.getInputString(this.amount.amount, this.amount.currency)
            },
            set: function(value) {
                this.amount.amount = Money.getAmount(value)
            }
        }
    },
    methods: {
        internalValidation(numeric) {
            return this.rules.reduce((acc, rule) => {
                var res = acc
                if(rule.validator(numeric)) {
                    res = {
                        "valid": false,
                        "msg": rule.msg
                    }
                }
                return res
            }, {
                "valid": true
            })
        },
        change() {
            this.$emit("change", this.amount)
        }
    }
}

</script>

<style scoped>
.money {
    width: 100%;
    display: inline-flex;
    border-radius: 0em;
    border: 0em;
}
.money input {
    width: 80%;
    border-radius: 0em;
    border-top-right-radius: 0em;
    border-bottom-right-radius: 0em;;
    border: none;
}
.money select {
    background: rgba(34,36,38,.15);
    width: 20%;
    border: none;
    border-left: none;
    border-top-left-radius: 0em;
    border-bottom-left-radius: 0em;

}
</style>
