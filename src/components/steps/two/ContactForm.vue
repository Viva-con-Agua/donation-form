<template>
    <div class="steptwo">
        <vca-field :label="$t('contactform.label')">
            <div v-if="!urlEmail" class="vca-row">
                <vca-input
                    ref="email"
                    type="email"
                    :errorMsg="$t('contactform.email.error')"
                    @input="lower"
                    :placeholder="$t('contactform.email.placeholder')"
                    v-model.trim="anonymous.email"
                    :rules="$v.anonymous.email"
                >
                </vca-input>
            </div>

            <vca-input
                v-if="isCompany"
                ref="company"
                :errorMsg="$t('contactform.company.error')"
                :placeholder="$t('contactform.company.placeholder')"
                v-model.trim="anonymous.company_name"
                :rules="$v.anonymous.company_name"
            />

            <vca-field-row>
                <vca-input
                    ref="first_name"
                    first
                    :errorMsg="$t('contactform.firstname.error')"
                    :placeholder="$t('contactform.firstname.placeholder')"
                    v-model.trim="anonymous.first_name"
                    :rules="$v.anonymous.first_name"
                >
                </vca-input>
                <vca-input
                    ref="last_name"
                    last
                    :errorMsg="$t('contactform.lastname.error')"
                    :placeholder="$t('contactform.lastname.placeholder')"
                    v-model.trim="anonymous.last_name"
                    :rules="$v.anonymous.last_name"
                >
                </vca-input>
            </vca-field-row>

            <vca-checkbox
                v-if="!isCompany && language != 'at' && setting != 'nwt'"
                v-model="additional"
            >
                <div v-html="$t('contactform.additional')"></div>
            </vca-checkbox>

            <div v-if="additional">
                <div v-if="language == 'at' && !isCompany">
                    <span>{{ $t("contactform.birthdate.label") }}</span>
                    <vca-row>
                        <vca-input-date
                            ref="birthdate"
                            :errorMsg="$t('contactform.birthdate.error')"
                            :placeholder="
                                $t('contactform.birthdate.placeholder')
                            "
                            v-model.trim="anonymous.birthdate"
                            :rules="$v.anonymous.birthdate"
                        >
                        </vca-input-date>
                        <div class="inline-infobox">
                            <vca-info-box>{{
                                $t("contactform.birthdate.infobox")
                            }}</vca-info-box>
                        </div>
                    </vca-row>
                </div>

                <vca-field-row>
                    <vca-input
                        ref="street"
                        class="long"
                        first
                        :errorMsg="$t('contactform.street.error')"
                        :placeholder="$t('contactform.street.placeholder')"
                        v-model.trim="anonymous.street"
                        :rules="$v.anonymous.street"
                    >
                    </vca-input>
                    <vca-input
                        ref="number"
                        class="short"
                        last
                        :typeable="true"
                        :errorMsg="$t('contactform.number.error')"
                        :placeholder="$t('contactform.number.placeholder')"
                        v-model="anonymous.number"
                        :rules="$v.anonymous.number"
                    >
                    </vca-input>
                </vca-field-row>

                <vca-field-row>
                    <vca-input
                        class="short"
                        ref="zip"
                        first
                        :errorMsg="$t('contactform.zip.error')"
                        :placeholder="$t('contactform.zip.placeholder')"
                        v-model.trim="anonymous.zip"
                        :rules="$v.anonymous.zip"
                    >
                    </vca-input>
                    <vca-input
                        ref="city"
                        class="long"
                        last
                        :errorMsg="$t('contactform.city.error')"
                        :placeholder="$t('contactform.city.placeholder')"
                        v-model.trim="anonymous.city"
                        :rules="$v.anonymous.city"
                    >
                    </vca-input>
                </vca-field-row>

                <vca-country
                    :preselection="countryCode"
                    :countryCode="countryCode"
                    :rules="$v.country"
                    ref="country"
                    v-model="country"
                    label=""
                    :placeholder="$t('contactform.country.placeholder')"
                    :errorMsg="$t('contactform.country.error')"
                />
            </div>
            <div class="color-grey vca-right">
                {{ $t("contactform.required") }}
            </div>
        </vca-field>
    </div>
</template>
<script>
import { required, email } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import EventBus from "@/event-bus.js";
export default {
    name: "ContactForm",
    created() {
        if (this.language == "at" || this.setting == "nwt") {
            this.additional = true;
        }
    },
    computed: {
        ...mapGetters({
            isCompany: "isCompany",
            setting: "setting",
            language: "company/settings",
        }),
        urlEmail() {
            return this.$route.query.email != null;
        },
        anonymous: {
            get() {
                return this.$store.state.payment.contact;
            },
            set(value) {
                this.$store.commit("payment/contact", value);
            },
        },
        country: {
            get() {
                return this.$store.state.payment.country;
            },
            set(value) {
                this.$store.commit("payment/country", value);
            },
        },
        additional: {
            get() {
                return this.$store.state.payment.donation_receipt;
            },
            set(value) {
                this.$store.commit("payment/donation_receipt", value);
            },
        },
        countryCode() {
            return this.language == "at" ? "AT" : "DE";
        },
    },
    watch: {
        isCompany: function (val) {
            if (val || this.language == "at") {
                this.additional = true;
            } else {
                this.additional = false;
            }
        },
    },
    validations() {
        if (this.isCompany) {
            return {
                anonymous: {
                    email: {
                        email,
                        required,
                    },
                    first_name: {
                        required,
                    },
                    last_name: {
                        required,
                    },
                    street: {
                        required,
                    },
                    number: {
                        required,
                    },
                    zip: {
                        required,
                    },
                    city: {
                        required,
                    },
                    company_name: {
                        required,
                    },
                },
                country: {
                    required,
                },
            };
        } else {
            if (this.additional) {
                if (this.language == "at") {
                    return {
                        anonymous: {
                            email: {
                                email,
                                required,
                            },
                            first_name: {
                                required,
                            },
                            last_name: {
                                required,
                            },
                        },
                    };
                } else {
                    return {
                        anonymous: {
                            email: {
                                email,
                                required,
                            },
                            first_name: {
                                required,
                            },
                            last_name: {
                                required,
                            },
                            street: {
                                required,
                            },
                            number: {
                                required,
                            },
                            zip: {
                                required,
                            },
                            city: {
                                required,
                            },
                        },
                        country: {
                            required,
                        },
                    };
                }
            } else {
                return {
                    anonymous: {
                        email: {
                            email,
                            required,
                        },
                        first_name: {
                            required,
                        },
                        last_name: {
                            required,
                        },
                    },
                };
            }
        }
    },
    methods: {
        lower() {
            this.anonymous.email = this.anonymous.email.toLowerCase();
        },
    },
    updated() {
        EventBus.$emit("interaction");
    },
};
</script>
<style lang="scss">
.steptwo {
    .color-grey {
        color: #ccc;
        @include media(small) {
            font-size: 0.95em;
        }
    }
}
</style>
