<template>
    <div class="vca-input-checkbox" :class="{error: hasError}">
        <label class="container">
            <input type="checkbox" v-model="checked" @change="change">
            <span class="checkmark"></span>
            <slot></slot>
        </label>
        <span class="error-msg" v-if="hasError">{{ errorMsg }}</span>
    </div>
</template>
<script>
export default {
    name: 'CheckBox',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        errorMsg: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: 'please fill'
        },
        rules: {
            type: Object,
            default: null
        },
        label: {
            type: String,
            default: ""
        }
    },
    data(){
        return {
            checked: false,
            hasError: false
        }
    },
    mounted () {
        this.checked = this.value
    },
    methods: {
        change (e) {
            this.$emit('input',  e.target.checked)
        },
        // validate form via vuelidate
        validate () {
            // if validate is set
            if (this.rules !== null) {
                if (this.rules.$invalid) {
                    this.hasError = true
                } else {
                    this.hasError = false
                }
            }
        }
    }
}
</script>
<style type="text/css">

.vca-input-checkbox {
    margin-bottom: .3em;
}

/*********************
*** SCREEN 600 PX ***
**********************/

@media only screen and (max-width: 600px) {

    .vca-input-checkbox {
        font-size: 0.8em;
    }
}

</style>