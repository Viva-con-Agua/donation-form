<template>
    <vca-card>
        <h3>
            <i18n v-if="setting == 'nwt'" path="policies.label.nwt">
                <a :href="$t('policies.data.url')" class="href" target="_blank">{{ $t('policies.data.label') }}</a>
            </i18n>
            <i18n v-else-if="setting == 'mtg'" path="policies.label.donate">
                <a :href="$t('policies.data_mtg.url')" class="href" target="_blank">{{ $t('policies.data_mtg.label') }}</a>
            </i18n>
            <i18n v-else path="policies.label.donate">
                <a :href="$t('policies.data.url')" class="href" target="_blank">{{ $t('policies.data.label') }}</a>
            </i18n>
        </h3>
    </vca-card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Policies',
    computed: {
        ...mapGetters({
            setting: 'setting'
        })    
    }
}
</script>
