<template>
    <vca-field :label="$t('publish.label')">
        <form>
            <div class="vca-row">
                <div>
                    <input type="radio" id="yes" v-model="publish" value="yes">
                    <label for="yes"> {{ $t('publish.yes') }}</label>
                </div>
                <div>
                    <input type="radio" id="anonym" v-model="publish" value="anonym">
                    <label for="anonym"> {{ $t('publish.anonym') }}</label>
                </div>

                <!--div>
                <input type="radio" id="none" v-model="publish" value="none">
                <label for="none"> {{ $t('publish.none') }}</label>
            </div-->
        </div>
    </form>
</vca-field>
</template>
<script>
export default {
    name: 'PublishCheckbox',
    computed: {
        publish: {
            get () {
                return this.$store.state.payment.publish
            },
            set(value) {
                this.$store.commit('payment/publish', value)
            }
        }

    }
}
</script>
