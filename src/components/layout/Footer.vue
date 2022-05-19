<template>
    <div class="payment-footer">
        <p>
            {{ $t('information.label') }}
            <ul v-if="setting == 'nwt'">
                <li>{{ $t('information_nwt.info_1') }}</li>
                <li>{{ $t('information_nwt.info_2') }}</li>
            </ul>
            <ul v-else-if="setting == 'mtg'">
                <li>{{ $t('information.info_1') }}</li>
                <li>{{ $t('information.info_2') }}</li>
                <li>{{ $t('information_mtg.info_3') }}</li>
                <li>{{ $t('information_mtg.info_4') }}</li>
            </ul>
            <ul v-else>
                <li>{{ $t('information.info_1') }}</li>
                <li>{{ $t('information.info_2') }}</li>
                <li>{{ $t('information.info_3') }}</li>
                <li>{{ $t('information.info_4') }}</li>
            </ul>
        </p>
    </div>

</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Footer',
    computed: {
        ...mapGetters({
            setting: 'setting'
        })
    }
}
</script>
<style lang="scss">
.payment-footer {

    padding: 10px;
    
    display: block;
    ul {
        padding-left: 0;
        margin-top: 0;

        li {
            padding: 0;
            @include media(small) {
                font-size: .95em;
            }
        }

        li:before {
            margin-right: 5px;
            padding: 0;
            color: $main-color;
            content: '✓';
        }

    }
}
</style>
