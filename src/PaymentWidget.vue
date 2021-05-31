<template>
    <div id="payment-widget" class="payment-widget">
        <div class="widget" v-if="slider == 'cupslide'">
            <CupSlider/>
        </div>
        <div class="widget" v-if="slider == 'faucet'">
            <FaucetSlider/>
        </div>
        <MembershipForm v-on:success="success" :campaign="campaign" :country="country" :product="product"/>
    </div>
</template>
<script>

import axios from 'axios'
import MembershipForm from './MembershipForm'
import CupSlider from './components/slider/CupSlider'
import FaucetSlider from './components/slider/FaucetSlider'
export default {
    name: 'PaymentWidget',
    components:{ MembershipForm, FaucetSlider, CupSlider},
    props: {
        type: {
            type: String,
            default: 'donation'
        },
        slider: {
            type: String,
            default: 'cupslide'
        },
        campaign_id: {
            type: Number,
            default: 0
        },
        campaign_name: {
            type: String,
            default: 'Default campaign'
        },
        campaign_description: {
            type: String,
            default: 'Default description'
        },
        country: {
            type: String,
            default: 'DE'
        },
        currency: {
            type: String,
            default: 'EUR'
        },
        req_newsletter: {
            type: Boolean,
            default: false
        },
        product: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            campaign: {
                id: this.campaign_id,
                name: this.campaign_name,
                description: this.campaign_description
            }
        }
    },
    computed: {
        donation () {
            if (this.type === 'donation') {
                return true
            }else{
                return false
            }
        },
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
        success(e) {
            axios.post(process.env.VUE_APP_IROBERT, JSON.stringify(e))
            .then(response => (
                console.log(response.data)
            ))
        }
    }
}
</script>
<style lang="scss">
.payment-widget {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    max-width: 1600px;
    min-width: 80%;
    margin: auto;
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;
}
.tabs-details {
    padding: 1em;
}

</style>
