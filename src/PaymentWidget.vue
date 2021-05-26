<template>
    <div id=payment-widget class="payment-widget">
        <div class="widget" v-if="donation && slider == 'cupslide'">
            <CupSlide ref="amount_widget" @amount="setAmount"/>
        </div>
        <div style="display: flex" v-if="donation">
            <DonationForm ref="donation_form" v-on:success="success" :currency="currency" :campaign="campaign" :country="country" @replyAmount="replyAmount" :reqNewsletter="req_newsletter"/>
        </div>
        <div v-if="membership">
            <MembershipForm v-on:success="success" :campaign="campaign" :country="country" :product="product"/>
        </div>
    </div>
</template>
<script>

import axios from 'axios'
import MembershipForm from './MembershipForm'
import DonationForm from './DonationForm'
import CupSlide from './components/cups/CupSlide'
export default {
    name: 'PaymentWidget',
    components:{DonationForm, MembershipForm, CupSlide},
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
        membership () {
            if (this.type === 'membership') {
                return true
            } else {
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
            var url = this.getURL()
            if (url != false) {
                axios.post(url, JSON.stringify(e))
                .then(response => (
                    console.log(response.data)
                ))
            }
        },
        setAmount(value) {
            this.$refs.donation_form.setAmount(value)
        },
        replyAmount(value) {
            if (this.$refs.amount_widget) {
                this.$refs.amount_widget.replyAmount(value)
            }
        },
        getURL() {
            var url = false
            if(this.isDE) {
                url = (this.membership) ? process.env.VUE_APP_IROBERT_MEMBERSHIP : process.env.VUE_APP_IROBERT_DONATION
            } else if (this.isAT) {
                url = process.env.VUE_APP_IROBERT_DONATION_AT
            }
            return url
        }
    }
}
</script>
<style>
.payment-widget {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    width: auto;
    max-width: 1600px;
    position: center;
    margin: 0 auto;
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;
}
.tabs-details {
    padding: 1em;
}

</style>
