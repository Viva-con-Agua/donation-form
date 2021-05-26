<template>
    <div class="steptwo">
        <vca-field label="Ich spende via">
            <div class="paymentview">
                <PaymentButtons :product="product" v-on:success="success" v-on:paymentType="setPaymentType" :payment="payment" :label="label" :country="country" :valid="valid" @notValid="notValid"/>
            </div>
        </vca-field>
        <div class="nav-btn-container">
            <div class="nav-back">
                <button class="submit nav-btn-back>" @click.prevent="back"> Zurück zu Schritt 2 </button>
            </div>
        </div>
    </div>
</template>
<script>
import PaymentButtons from '../PaymentButtons'
export default {
    name: 'StepThree',

    props: ['payment', 'country', 'valid', 'label', 'product'],
    components: {PaymentButtons},
    data() {
        return {
            paymentType: 'sepa'
        }
    },
    methods: {
        success(e) {
            this.$emit("success", e)
        },
        notValid() {
            this.$emit("notValid")
        },
        back() {
            this.$emit("back")
        },
        setPaymentType(val) {
            this.paymentType = val
        }
    }

}
</script>
