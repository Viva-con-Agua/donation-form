<template>
    <vca-card>
        <vca-field :label="$t('next.label')">
            <p class="text-center" v-html="$t('next.receipt')"></p><br/>
            <p class="text-center">{{ $t('next.newsletter.text') }}</p>

            <div class="vca-center" v-if="showEmail">
                <div class="vca-row quarter">
                    <vca-input
                        ref="email"
                        :errorMsg="$t('contactform.email.error')"
                        @input="lower"
                        :placeholder="$t('contactform.email.placeholder')"
                        :rules="$v.anonymous.email"
                        v-model.trim="anonymous.email" 
                        >
                    </vca-input>
                </div>
            </div>
            <button v-if="flow" class="vca-button quarter" @click.prevent="submit">{{ $t('next.newsletter.button') }}</button>
            <div class="vca-column" v-else>
                <button class="vca-button quarter" disabled @click.prevent="submit">{{ $t('next.newsletter.button') }}</button>
                <div class="primary-dark bold tenseconds-success vca-border text-center quarter">{{ $t('next.newsletter.success') }}</div>
            </div>
            <p class="text-center">{{ $t('next.yours') }}</p>
        </vca-field>
    </vca-card>
 </template> 

<script>
import { required, email} from 'vuelidate/lib/validators'
export default {
    name: 'Next',    
    data() {
        return {
            showEmail: false,
            flow: true
        }
    },
    computed: {
        anonymous: {
            get () {
                return this.$store.state.payment.contact
            },
            set(value) {
                this.$store.commit('payment/contact', value)
            }
        }
    },
    validations() {
        return {
            anonymous: {
                email: {
                    email,
                    required
                }
            }
        }
    },
    created() {
        this.showEmail = !this.anonymous.email
    },
    methods: {
        lower() {
            this.anonymous.email = this.anonymous.email.toLowerCase()
        },
        submit() {
            this.$refs.email.validate()

            if(this.$v.$invalid) {
                return
            }

            this.$store.dispatch({type: 'newsletter'})
            .then((resp) => {
                this.flow = false
                console.log(resp)
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .quarter {
        @include media(small) {
            width: 100% !important;
        }
    }
</style>