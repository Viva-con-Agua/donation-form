<template>
    <div class="steptwo">
        <vca-field label="Ich spende als">
                <div class="btn-center-container">
                    <button :class="btnSelected('private')" class="selection-button"  @click.prevent="selectCompany(false)">Privatperson</button>
                    <button :class="btnSelected('company')" class="selection-button" @click.prevent="selectCompany(true)">Unternehmen</button>
                </div>
        </vca-field>
        <vca-field label="Persönliche Angaben">
            <vca-input 
                   ref="email"
                   errorMsg="Bitte E-Mail Adresse eintragen"
                   placeholder="E-Mail Adresse"
                   v-model.trim="supporter.email" 
                   :value="supporter.email"
                   :rules="$v.supporter.email"/>
                <vca-field-row>
                    <vca-input 
                   ref="first_name"
                   first
                   errorMsg="Bitte Vornamen eintragen"
                   placeholder="Vorname"
                   v-model.trim="supporter.first_name" 
                   :rules="$v.supporter.first_name">
                    </vca-input>
                    <vca-input
                        ref="last_name"
                        last
                        errorMsg="Bitte Nachnamen eintragen"
                        placeholder="Nachname"
                        v-model.trim="supporter.last_name" 
                        :rules="$v.supporter.last_name">
                    </vca-input>
                </vca-field-row>
            <vca-input 
                   v-if="offset.company"
                   ref="company"
                   errorMsg="Bitte gib deinen Firmennamen an"
                   placeholder="Name des Unternehmens"
                   v-model.trim="supporter.company_name" 
                   :rules="$v.supporter.company_name"/>
                <vca-input 
                   ref="street"
                   errorMsg="Bitte gib Straße und Hausnummer an"
                   placeholder="Straße und Hausnummer"
                   v-model.trim="supporter.street" 
                   :rules="$v.supporter.street"/>
                    <vca-field-row>
                        <vca-input 
                   ref="zip"
                   first
                   errorMsg="Bitte gib deine Postleitzahl an"
                   placeholder="PLZ"
                   v-model.trim="supporter.zip" 
                   :rules="$v.supporter.zip">
                        </vca-input>
                        <vca-input
                            ref="city"
                            last
                            errorMsg="Bitte gib deine Wohnort an"
                            placeholder="Ort"
                            v-model.trim="supporter.city" 
                            :rules="$v.supporter.city">
                        </vca-input>
                    </vca-field-row>
                        <div class="vca-input">
                            <VcACountrySelect 
                                ref="country_name" 
                                :rules="$v.supporter.country_name" 
                                v-model="supporter.country_name" 
                                :country="supporter.country" 
                                errorMsg="Bitte wähle ein Land aus" 
                            />
                        </div>
                        <CheckBox
                            ref="data_privacy"
                            v-model="offset.data_privacy" 
                            errorMsg="Bitte bestätige die Datenschutzerklärung und die AGB" 
                            :rules="$v.offset.data_privacy" >
                                    Ich habe die <a href="https://www.vivaconagua.org/datenschutzerklaerung" target="_blank">Datenschutzerklärung</a> und die <a href="https://www.vivaconagua.org/agb" target="_blank">AGB</a> gelesen.
                        </CheckBox>
                    <CheckBox
                        v-model="offset.newsletter">
                            <div class="highlight">FLASCHENPOST:</div> Hier klicken, wenn du News und Projektupdates per E-Mail haben möchtest.<br/>
                            Kommt ca 1. im Monat und kannst du in jedem Newsletter wieder abbestellen. :)
                    </CheckBox>
                        <div class="select-known">
                            <label>So bin ich auf euch aufmerksam geworden</label>
                            <div class="vca-input">
                                <select v-model="offset.known_from" name="known">
                                    <option value="">Bitte wählen</option>
                                    <option value="family_friends">Familie & Freunde</option>
                                    <option value="festivals_cupdonation">Festivals & Becherspende</option>
                                    <option value="water">Wasser</option>
                                    <option value="instagram">Instagram</option>
                                    <option value="facebook">Facebook</option>
                                </select>
                            </div>
                        </div>
        </vca-field>
        <div class="nav-btn-container">
            <div class="nav-back">
                <button class="submit nav-btn-back>" @click.prevent="back"> Zurück zu Schritt 1 </button>
            </div>
            <div class="nav-next">
                <button class="submit nav-btn" @click.prevent="submit" :disabled="$v.$invalid"> Weiter zu Schritt 3 </button>
            </div>
        </div>
    </div>
</template>
<script>

import { required, email} from 'vuelidate/lib/validators'
import CheckBox from '../utils/CheckBox'
import VcACountrySelect from '../utils/VcACountrySelect'
export default {
    name: 'StepTwo',
    components: {
        CheckBox, VcACountrySelect
    },
    props: ['supp', 'off'],
    data () {
        return {
            label: {
                data_privacy: 'Ich habe die <a href="https://www.vivaconagua.org/datenschutzerklaerung" target="_blank">Datenschutzerklärung</a> und die <a href="https://www.vivaconagua.org/agb" target="_blank">AGB</a> gelesen.'

            },
            offset: {
                company: false,
                data_privacy: false,
                newsletter: false,
                known_from: ""
            },
            supporter: {
                email: '',
                first_name: '',
                last_name: '',
                street: '',
                zip: '',
                city: '',
                country: 'DE'
            }
        }
    },
    mounted () {
        this.supporter = this.supp
        this.offset = this.off
    },
    validations() {
        if (this.offset.company) {
            return {
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
                    },
                    country: {
                        required
                    },
                    city: {
                        required
                    },
                    zip: {
                        required
                    },
                    street: {
                        required
                    },
                    company_name: {
                        required
                    }
                },
                offset: {
                    data_privacy: {
                        watcher: value => value === true                    
                    }
                }
            }
        } else {
            return {
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
                    },
                    country: {
                        required
                    },
                    city: {
                        required
                    },
                    zip: {
                        required
                    },
                    street: {
                        required
                    }

                },
                offset: {
                    data_privacy: {
                        watcher: value => value === true                    
                    }
                }
            }
        }
    },
    methods: {
        selectCompany(company) {
            this.offset.company = company
        },
        btnSelected(val) {
            if (this.offset.company) {
                return (val == 'company') ? 'selected' : '';
            } else {
                return (val != 'company') ? 'selected' : '';
            }
        },
        back() {
            this.$emit("back")
        },
        validate() {
            this.$refs.email.validate()
            this.$refs.last_name.validate()
            this.$refs.first_name.validate()
            this.$refs.street.validate()
            this.$refs.zip.validate()
            this.$refs.city.validate()
            this.$refs.country_name.validate()
            this.$refs.data_privacy.validate()
            if (this.offset.company) {
                this.$refs.company.validate()
            }
        },
        submit() {
            if (!this.$v.$invalid) {
                this.$emit("submit", this.supporter, this.offset)
            } else {
                this.validate()
            }
        }

    }
}
</script>
<style>

.select-known {
    display: inline-flex;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 1em;
}

.select-known label {
    padding-top: .6em;
    margin-right: .6em;
    margin-bottom: .6em;
}

.select-known select {
    min-width: 170px;
}

/*********************
*** SCREEN 600 PX ***
**********************/

@media only screen and (max-width: 600px) {
    .select-known label {
        font-size: .8em;
    }
}

</style>
