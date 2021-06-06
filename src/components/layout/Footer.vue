<template>
    <vca-card class="payment-footer">
        <p>
            {{ $t('information.label') }}
            <ul>
                <li>{{ $t('information.info_1') }}</li>
                <li>{{ $t('information.info_2') }}</li>
                <li>{{ $t('information.info_3') }}</li>
                <li>{{ $t('information.info_4') }}</li>
            </ul>
        </p>
    </vca-card>

</template>
<script>

export default {
    name: 'Footer'
}
</script>
<style lang="scss">
.payment-footer {
    display: none;

    @include media(large) {
        display: block;
        ul {
            padding-left: 0;
            margin-top: 0;

            li {
                padding: 0;
            }

            li:before {
                margin-right: 5px;
                padding: 0;
                color: $vca-main;
                content: '✓';
            }

        }
    }
}
</style>
