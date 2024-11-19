<template>
    <vca-card>
        <div class="button-wrapper">
            <div>
                <h1 class="text-center header-xl">
                    {{ $t('thanks.header') }}
                </h1>
                <!--h2 class="text-center">{{ $t("thanks.subheader") }}</h2-->
            </div>
            <!--p class="text-center" v-if="getExample && setting != 'nwt'">
                {{ $t("thanks.text", { 0: getAmount, 1: getExample }) }}
            </p-->
            <div class="container">
                <vca-column class="text-block">
                    <p>{{ $t('thanks.text_p1', [getAmount]) }}</p>
                    <p>{{ $t('thanks.text_p2') }}</p>
                    <p>{{ $t('thanks.text_p3') }}</p>
                </vca-column>
                <div class="img-block">
                    <img src="@/assets/img/ThanksPageText.png" />
                </div>
            </div>
        </div>
    </vca-card>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        name: 'Thanks',
        computed: {
            ...mapGetters({
                money: 'payment/money',
                setting: 'setting',
                examples: 'company/examples',
            }),
            getAmount() {
                return this.toLocaleString(this.money.amount / 100) + ' ';
            },
            getExample() {
                if (!this.examples) {
                    return this.$t('example.default');
                }

                let res = this.examples.filter((t) => this.money.amount >= t.value);
                return res.length > 0
                    ? this.$t('thanks.' + res[0].message)
                    : this.$t('example.default');
            },
        },
    };
</script>
<style lang="scss" scoped>
    .header-xl {
        font-size: 3.5em;
        color: $primary-dark;
        font-weight: inherit;
        @include media(large) {
            font-size: 4.5em;
        }
    }
    .container {
        display: flex;
        flex-direction: row;
        gap: 1em;
        @include media(large) {
            gap: 5em;
        }
    }
    .text-block {
        font-size: 0.86em;
        @include media(large) {
            font-size: 1em;
        }
        flex-basis: 100%;
        p {
            margin-top: 15px;
            :not(:last-child) {
                margin-bottom: 15px;
            }
        }
    }
    .img-block {
        flex-basis: 100%;
        align-self: flex-start;
        text-align: center;
        margin-top: 15px;
        @include media(large) {
            align-self: auto;
        }
        img {
            max-height: 450px;
            max-width: 300px;
            width: 100%;
        }
    }
</style>
