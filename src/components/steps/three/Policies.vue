<template>
    <vca-card>
        <h3><i18n path="policies.label">
            <a :href="$t('policies.data.url')" target="_blank">{{ $t('policies.data.label') }}</a>
            <a :href="$t('policies.tos.url')" target="_blank">{{ $t('policies.tos.label') }}</a>
        </i18n></h3>
    </vca-card>
</template>
<script>
export default {
    name: 'Policies'
}
</script>
