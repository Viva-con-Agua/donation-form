<template>
    <div id="donation-form">
        <el-form>
            <h4> Betrag </h4>
            <el-row>
                <el-col :span="9">
                    <el-radio-group v-model="donation.money.amount">
                        <el-radio-button label="15">15 €</el-radio-button>
                        <el-radio-button label="25">25 €</el-radio-button>
                        <el-radio-button label="50">50 €</el-radio-button>
                    </el-radio-group>
                </el-col>

                <el-col :span="6">
                    <el-input placeholder="Please input" v-model="donation.money.amount">
                        <template slot="append">€</template>
                    </el-input>
                </el-col>
            </el-row>
            <h4> Spendenintervall auswählen </h4>
            <el-radio-group v-model="donation.loop">
                <el-radio-button label="single">einmalig</el-radio-button>
                <el-radio-button label="month">monatlich</el-radio-button>
                <el-radio-button label="quartar">1/4-jährlich</el-radio-button>
                <el-radio-button label="halfyear">1/2-jährlich</el-radio-button>
                <el-radio-button label="year">jährlich</el-radio-button>
            </el-radio-group>

            <h4> Persönliche angaben </h4>
            <el-row>
                <el-col :span="12">
                    <el-form-item
                        prop="firstName">
                        <el-input
                            placeholder="firstName"
                            v-model="donation.firstName"
                            autoComplete="on"
                            />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item
                        prop="lastName">
                        <el-input

                            placeholder="lastName"
                            v-model="donation.lastName"
                            >
                        </el-input>
                    </el-form-item>
                </el-col>



            </el-row>
                <el-form-item
                    prop="email">
                        <el-input

                            placeholder="email"
                            v-model="donation.email"
                            >
                        </el-input>
                    </el-form-item>
            <AddressForm/>
            <el-checkbox v-model="donation.newsletter">Newsletter</el-checkbox>
            <Payment/>        
        </el-form>
    </div>
</template>
<script>
import AddressForm from '@/components/AddressForm.vue'
import Payment from '@/components/Payment.vue'

export default {
    name: 'DonationForm',
    components: {AddressForm, Payment},
    data() {
        return {
            donation: {
                email: '',
                firstName: '',
                lastName:'',
                loop: 'single',
                money: {
                    amount: 0,
                    currency: 'EUR'
                },
                address: null,
                newsletter: false
            }
        }
    }
}
</script>
