<template>
    <vca-card>
        <div class="button-wrapper">
            <div>
                <h1 class="text-center header-xl">
                    {{ $t("thanks.header") }}
                </h1>
                <!--h2 class="text-center">{{ $t("thanks.subheader") }}</h2-->
            </div>
            <!--p class="text-center" v-if="getExample && setting != 'nwt'">
                {{ $t("thanks.text", { 0: getAmount, 1: getExample }) }}
            </p-->
            <div class="container">
                <div class="text-block">

            <p>{{ $t('thanks.text_p1', [getAmount]) }}</p>
            <br><br>
            <p>{{ $t('thanks.text_p2') }}</p>
            <br><br>
            <p> {{$t('thanks.text_p3')}}</p>
                </div>
                <div class="img-block">
                    <img style="width: 100%;" src="@/assets/img/ThanksPageText.png" />
                </div>
            </div>
        </div>
    </vca-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "Thanks",
    computed: {
        ...mapGetters({
            money: "payment/money",
            setting: "setting",
            examples: "company/examples",
        }),
        getAmount() {
            return (
                this.toLocaleString(this.money.amount / 100) +
                " "
            );
        },
        getExample() {
            if (!this.examples) {
                return this.$t("example.default");
            }

            let res = this.examples.filter((t) => this.money.amount >= t.value);
            return res.length > 0
                ? this.$t("thanks." + res[0].message)
                : this.$t("example.default");
        },
    },
};
</script>
<style lang="scss" scoped>
.header-xl {
    font-size: 4.5em;
    color: $primary-dark;
    font-weight: inherit;
}
.container {
    display: flex;
    flex-direction: row;
    gap: 5em;
}
.text-block {
    font-size: 0.86em;
    flex-basis: 60%;
}
.img-block {
    flex-basis: 40%;
}
</style>
