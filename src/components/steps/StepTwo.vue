<template>
    <div class="steptwo">
        <ContactTypeSelect v-if="setting !== 'nwt'" />
        <ContactForm ref="contactdata" />
        <PublishCheckbox v-if="setting == 'twitch'"/>
        <vca-arrow-navigation @next="submit" @back="back" :backLabel="this.$t('buttons.back')" :nextLabel="this.$t('buttons.next')" :nextEnabled="isValid"/>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ContactTypeSelect from '@/components/steps/two/ContactTypeSelect'
import ContactForm from '@/components/steps/two/ContactForm'
import PublishCheckbox from '@/components/steps/two/PublishCheckbox'
export default {
    name: 'StepTwo',
    components: {
        ContactTypeSelect, ContactForm, PublishCheckbox
    },
    data () {
        return {
            isValid: true,
        }
    },
    mounted () {
        this.isValid = !this.$refs.contactdata.$v.$invalid
        this.$watch(() => {
                return this.$refs.contactdata.$v.$invalid
            },(val) => {
                this.isValid = !val
            }
        )
    },
    computed: {
        ...mapGetters({
            setting: 'setting',
            trackingData: 'payment/trackingData'
        })
    },
    methods: {
        back() {
            this.$emit("back")
        },
        submit() {
            this.$store.commit("payment/trackingData", "view_donation_form_step3")
            var data = this.trackingData
            this.trackingTrigger(data)
            this.gtmTrack("click", "StepTwo Next donation-form", 0)
            this.$store.dispatch("payment/process").then(() => {
                this.$emit("submit")
            })
            .catch((err) => console.log(err))
        }
    }
}
</script>
