<template>
    <vca-card>
        <vca-field :label="$t('next.label')">
            <p class="text-center" v-html="$t('next.receipt')"></p><br/>
            <p class="text-center">{{ $t('next.newsletter.text') }}</p>
            <button class="vca-button quarter" @click.prevent="submit">{{ $t('next.newsletter.button') }}</button>
            <p class="text-center">{{ $t('next.yours') }}</p>
        </vca-field>
    </vca-card>
 </template> 

<script>
export default {
    name: 'Next',
    methods: {
        submit() {
            console.error("NOT IMPLEMENTED YET")
        }
    }
}
</script>