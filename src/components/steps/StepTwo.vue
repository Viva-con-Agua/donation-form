<template>
    <div class="steptwo">
        <ContactTypeSelect />
        <ContactForm ref="contactdata" />
        <ArrowNavigation @next="submit" @back="back" :nextEnabled="isValid"/>
    </div>
</template>
<script>
import ContactTypeSelect from '@/components/steps/two/ContactTypeSelect'
import ContactForm from '@/components/steps/two/ContactForm'
import ArrowNavigation from '@/components/layout/ArrowNavigation.vue'
export default {
    name: 'StepTwo',
    components: {
        ContactTypeSelect, ContactForm, ArrowNavigation
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
    methods: {
        back() {
            this.$emit("back")
        },
        submit() {
            this.$emit("submit")
        }
    }
}
</script>