<template>
    <div class="stepone">
        <vca-field label="Wähle dein Intervall">
            <div class="btn-center-container">
                <button :class="btnSelected('month')" class="selection-button" @click.prevent="selectInterval('month')">{{ $t('interval.monthly')  }}</button>
                <button :class="btnSelected('year')" class="selection-button" @click.prevent="selectInterval('year')">Jahresbeitrag</button>
            </div>
        </vca-field>
        <vca-field label="Wähle deinen Mitgliedsbeitrag">
            <div v-if="interval === 'month'" class="btn-flex-container">
                <button class="btn-drop .btn-flex-box" :class="dropSelected(500)" @click.prevent="selectAmount(500)">
                    <div v-if="money.amount != 500" >
                        <img src="~@/assets/icon_vca.png"/>
                    </div>
                    <div v-else>
                        <img src="~@/assets/icon_vca_white.png"/>
                    </div>
                    <span class="btn-amount">5 EURO</span><br/><div class="btn-type">TROPFEN Fördermitglied</div>
                </button>
                <button class="btn-drop .btn-flex-box" :class="dropSelected(1000)" @click.prevent="selectAmount(1000)">
                    <div v-if="money.amount != 1000" >
                        <img src="~@/assets/icon_vca.png"/>
                        <img src="~@/assets/icon_vca.png"/>
                    </div>
                    <div v-else>
                        <img src="~@/assets/icon_vca_white.png"/>
                        <img src="~@/assets/icon_vca_white.png"/>
                    </div>
                    <span class="btn-amount">10 EURO</span><br/><div class="btn-type">BRUNNEN Fördermitglied</div>
                </button>
                <button class="btn-drop .btn-flex-box" :class="dropSelected(2000)" @click.prevent="selectAmount(2000)">
                    <div v-if="money.amount != 2000" >
                        <img src="~@/assets/icon_vca.png"/>
                        <img src="~@/assets/icon_vca.png"/>
                        <img src="~@/assets/icon_vca.png"/>
                    </div>
                    <div v-else>
                        <img src="~@/assets/icon_vca_white.png"/>
                        <img src="~@/assets/icon_vca_white.png"/>
                        <img src="~@/assets/icon_vca_white.png"/>
                    </div>
                    <span class="btn-amount">20 EURO</span><br/><div class="btn-type">QUELLEN Fördermitglied</div>
                </button>
            </div>

            <div v-if="interval === 'year'" class="btn-flex-container">
                <button class="btn-drop .btn-flex-box" :class="dropSelected(6000)" @click.prevent="selectAmount(6000)">
                     <div v-if="money.amount != 6000" >
                        <img src="~@/assets/icon_vca.png"/>
                    </div>
                    <div v-else>
                        <img src="~@/assets/icon_vca_white.png"/>
                    </div>
                    <span class="btn-amount">60 EURO</span><br/><div class="btn-type">TROPFEN Fördermitglied</div>
                </button>
                <button class="btn-drop .btn-flex-box" :class="dropSelected(12000)" @click.prevent="selectAmount(12000)">
                     <div v-if="money.amount != 12000" >
                        <img src="~@/assets/icon_vca.png"/>
                        <img src="~@/assets/icon_vca.png"/>
                    </div>
                    <div v-else>
                        <img src="~@/assets/icon_vca_white.png"/>
                        <img src="~@/assets/icon_vca_white.png"/>
                    </div>
                    <span class="btn-amount">120 EURO</span><br/><div class="btn-type">BRUNNEN Fördermitglied</div>
                </button>
                <button class="btn-drop .btn-flex-box" :class="dropSelected(24000)" @click.prevent="selectAmount(24000)">
                     <div v-if="money.amount != 24000" >
                        <img src="~@/assets/icon_vca.png"/>
                        <img src="~@/assets/icon_vca.png"/>
                        <img src="~@/assets/icon_vca.png"/>
                    </div>
                    <div v-else>
                        <img src="~@/assets/icon_vca_white.png"/>
                        <img src="~@/assets/icon_vca_white.png"/>
                        <img src="~@/assets/icon_vca_white.png"/>
                    </div>
                    <span class="btn-amount">240 EURO</span><br/><div class="btn-type">QUELLEN Fördermitglied</div>
                </button>
            </div>
        </vca-field>
        <vca-field :label="customPaymentMin">
            <vca-field-row>
                <vca-money-input 
                        ref="money" 
                        v-model="money" 
                        :money="money"
                        :rules="$v.money" 
                        errorMsg="Bitte wähle mindestens 60 Euro"  
                        topText="anderer Betrag?"/>
            </vca-field-row>
        </vca-field>

        <div class="nav-btn-container">
            <div class="nav-next">
                <button class="submit nav-btn" @click.prevent="submit" :disabled="$v.$invalid"> Weiter zu Schritt 2 </button>
            </div>
        </div>
    </div>

</template>
<script>
import { required, minValue } from 'vuelidate/lib/validators'

export default {
    name: 'StepOne',
    props: ["moneyprop"],
    data () {
        return {
            interval: "month",
            money: {
                amount: 0,
                currency: "EUR"
            }
        }
    },
    mounted () {
        this.money = this.moneyprop
    },
    validations() {
        return {
            money: {
                amount: {
                    required,
                    minValue: this.paymentMin
                }
            }
        }
    },
    computed: {
        customPaymentMin: function () {
            if (this.interval === 'month') {
                return "Du willst einen anderen Mitgliedsbeitrag? Kein Problem! (ab 5 Euro)"
            } else {
                return "Du willst einen anderen Mitgliedsbeitrag? Kein Problem! (ab 60 Euro)"
            }
        },
        paymentMin: function () {
            if (this.interval === 'month') {
                return minValue(500)
            } else {
                return minValue(6000)
            }
        } 
    },
    methods: {
        btnSelected(val) {
            return (this.interval == val) ? 'selected' : ''
        },
        dropSelected(val) {
            return (this.money.amount == val) ? 'btn-drop-selected' : ''
        },
        selectInterval(interval) {
            this.interval = interval
        },
        selectAmount(amount) {
            this.money.amount = amount
        },
        submit() {
            if (!this.$v.$invalid) {
                this.$emit("submit", this.interval, this.money )
            } else {
                this.$refs.money.validate()
            }
        }
    }
}
</script>
<style type="text/css">

.btn-amount {
    font-size: 1.4em;
}
.btn-type {
    max-width: 180px;
    margin: 0 auto;
    text-align: center;
    font-size: .9em;
}

/*********************
*** SCREEN 600 PX ***
**********************/

@media only screen and (max-width: 600px) {
    .btn-type {
        font-size: .8em;
    }
    .btn-amount {
        font-size: .9em;
    }
}

</style>
