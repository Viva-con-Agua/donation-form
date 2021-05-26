<template>
    <div class="vca-country-select" :class="{error: hasError}">
        <label class="container">
            <country-select :class="{error: hasError}" :country="country" v-model="selectedCountry" topCountry="DE" />
        </label>
        <span v-if="hasError">{{ errorMsg }}</span>
        <span v-else></span>
    </div>
</template>
<script>
export default {
    name: 'VcACountrySelect',
    props: {
        country: {
            type: String,
            default: ''
        },
        errorMsg: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ""
        }
    },
    data(){
        return {
            hasError: false,
            selectedCountry: this.country
        }
    },
    methods: {
        // validate form via vuelidate
        validate () {
            // if validate is set
            if (this.selectedCountry == '') {
                this.hasError = true
            } else {
                this.hasError = false
            }
        }
    }
}
</script>
