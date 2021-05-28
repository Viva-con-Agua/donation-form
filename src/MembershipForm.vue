<template>
    <div class="membership">
        <div class="membership-form" v-if="!successView">
            <div class="vca">
                <vca-form>
                    <HeaderSteps :currentStep=step :steps=steps />
                    <div class="membership-form-content">
                        <StepOne v-if="step === 1" @submit="submitStepOne"/>
                        <StepTwo v-if="step === 2" @submit="submitStepTwo" @back="backStepOne" :supp="payment.supporter" :off="payment.offset"/>
                        <StepThree v-if="step === 3" :product="product" :payment="payment" :country="country" :label="getLabel" :valid="$v.payment" @back="backStepTwo" @success="success"/>
                        <StepThanks v-if="step === 4" :payment="payment"/>
                    </div>
                    <PaymentFooter v-if="step === 3 || step === 2" :money="payment.money" :interval="payment.transaction.interval" />
                </vca-form>
            </div>
        </div>

    </div>
</template>
<script>
import axios from 'axios'
import { required, email, minValue } from 'vuelidate/lib/validators'
import StepOne from './components/membership/StepOne'
import StepTwo from './components/membership/StepTwo'
import StepThree from './components/membership/StepThree'
import StepThanks from './components/membership/StepThanks'
import PaymentFooter from './components/PaymentFooter'
import HeaderSteps from './components/HeaderSteps'
export default {
    name: 'MembershipForm',
    components: {StepOne, StepTwo, StepThree, StepThanks, PaymentFooter, HeaderSteps },
    props: {
        description: {
            type: String,
            default: 'donation'
        },
        country: {
            type: String,
            default: 'DE'
        },
        currency: {
            type: String,
            default: 'EUR'
        },
        campaign: {
            type: Object,
            default() {
                return {}
            }
        },
        reqNewsletter: {
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
            step: 1,
            steps: 
            [
                {id: 1, label: this.$t('header.amount') },
                {id: 2, label: this.$t('header.contact') },
                {id: 3, label: this.$t('header.payment') },
                {id: 4, label: this.$t('header.tanks') }
            ],
            companey: false,
            successView: false,
            payment: {
                campaign: {
                    id: '',
                    name: '',
                    description: ''
                },
                transaction: {
                    id: '',
                    provider: '',
                    abo: false,
                    interval: '',
                    payment_type: '',
                    account: {}
                },
                supporter: {
                    email: '',
                    first_name: '',
                    last_name: '',
                    street: '',
                    number: '',
                    zip: '',
                    city: '',
                    country: 'DE',
                    company_name: ''
                },
                money: {
                    amount: 0,
                    currency: 'EUR'
                },
                offset: {
                    company: false,
                    data_privacy: false,
                    newsletter: false,
                    known_from: ""
                }
            },
            currencies: [
                {
                    label: '€',
                    value: 'EUR'
                }
            ]
        }
    },
    validations: {
        payment: {
            supporter: {
                email: {
                    required,
                    email
                },
                first_name: {
                    required
                },
                last_name: {
                    required
                }
            },
            money: {
                amount: {
                    required,
                    minValue: minValue(1)
                }
            }
        }
    },
    computed: {
        getLabel() {
            if (this.country == 'DE' || this.country == 'CH' || this.country == 'AT') {
                return "Jetzt absenden"
            }
            return "Pay now"
        }
    },
    mounted() {
        this.payment.campaign = this.campaign
        this.payment.money.currency = this.currency
        this.getLocation()
    },
    methods: {
        setAmount (value) {
            if (value.amount > this.open) {
                this.unit.amount.amount = this.open
            } else {
                this.unit.amount = value
            }
        },
        submitStepOne() {
            this.step = 2
        },
        backStepOne() {
            this.step = 1
        },
        backStepTwo() {
            this.step = 2
        },
        submitStepTwo(supporter, offset) {
            this.payment.supporter = supporter
            this.payment.offset = offset
            this.step = 3
        },
        success(e) {
            this.$emit("success", e)
            this.step = 4
        },
        getLocation() {
            var that = this
            axios.get("https://ipinfo.io/json?token=" + process.env.VUE_APP_IPINFO_TOKEN)
                .then(response => (
                    that.payment.supporter.country = response.data.country
                ))
                .catch(function (error) {
                    if (error.response) {
                      console.log(error.response.data.error.message);
                    }
                })
        }
    }
}
</script>

<style>

.membership-form-content {
    padding: 10px;
    border: solid 2px #008fc3;
}

.btn-center-container {
    text-align: center;
}

.btn-flex-container {
    display: flex;
    flex-wrap: nowrap;
}

.btn-flex-box {
    flex: auto;
    flex-basis: 25% !important;
}

.btn-center-container .selected {
    color: #fff;
    background-color: #008fc3;
}


/*
    CSS DROP BUTTON
*/
.btn-drop {
    cursor: pointer;
    background-image: none;
    background-size: contain;
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center;
    border: solid thin transparent;
    font-weight: bold;
    text-decoration: none;
    vertical-align: middle;
    color: #008fc2;
    min-height: 200px;
    margin: 0 auto;
}

.btn-drop:hover {
    background-image: url("~@/assets/icons/drop_white_outline.png");
}
.btn-drop-selected,
.btn-drop-selected:hover {
    color: #fff;
    background-image: url("~@/assets/icons/drop.png");
}

.btn-drop div img {
    width: 35px;
    position: relative;
    bottom: 10px;
}

/*
    CSS NAVIGATION BUTTON
*/
.nav-btn-container {
    display: flex;
}

.nav-btn-container .nav-next,
.nav-btn-container .nav-back {
    flex: auto;
    flex-basis: 100%;
    margin-bottom: 1em;
}

.nav-btn-container .nav-next {
    text-align: right;
}

.nav-btn-container .nav-back {
    text-align: left;
}

.nav-btn-container .nav-next button:hover,
.nav-btn-container .nav-back button:hover {
    background-color: #0070ba;
}

.nav-btn-container .nav-next button:disabled,
.nav-btn-container .nav-back button:disabled {
    background: #fff;
    color: #008fc3;
    opacity: 0.3;
    cursor: default;
}

.nav-btn-container .nav-next button,
.nav-btn-container .nav-back button {
    cursor: pointer;
    font-size: 1.2em;
    height: auto;
    width: auto;
    background-color: #008fc3;
    color: #fff;
    padding: 0.5em 1.2em;
    border: 0;
    text-transform: uppercase;
    font-weight: bold;
    text-decoration: none;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
    -moz-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
    -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
}

/*********************
*** SCREEN 600 PX ***
**********************/

@media only screen and (max-width: 600px) {

    .btn-flex-container {
        flex-wrap: wrap;
    }
    
    /*
        CSS NAVIGATION BUTTON
    */
    .nav-btn-container .nav-next button,
    .nav-btn-container .nav-back button {
        white-space: nowrap;
        font-size: .7em;
    }

    /*
        CSS DROP BUTTON
    */

    .btn-drop div img {
        width: 30px;
    }
    .btn-drop {
        max-width: 170px;
        background-image: url("~@/assets/icons/drop_white_outline.png");
    }

    .btn-drop-selected {
        background-image: url("~@/assets/icons/drop.png");
    }

}

/*********************
*** SCREEN 400 PX ***
**********************/

@media only screen and (max-width: 400px) {

    .nav-btn-container {
        flex-wrap: wrap-reverse;
    }

}

</style>
