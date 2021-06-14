<template>
    <vca-card>
        <vca-field :label="$t('tenseconds.label')">
            <div class="vca-row">
                <div class="vca-flexbox">
                    <vca-card>
                        <p v-html="$t('tenseconds.knownfrom.label')"></p>
                    </vca-card>
                </div>
                <div class="vca-flexbox">
                    <vca-dropdown v-model="offset.known_from" @input="select" :options="knownfrom.dropdown" :placeholder="$t('tenseconds.knownfrom.dropdown.placeholder')" title="Dropdown" label=""/>
                </div>
            </div>
            <div class="vca-row">
                <div class="vca-flexbox">
                    <vca-card>
                        <p v-html="$t('tenseconds.comment.label')"></p>
                    </vca-card>
                </div>
                <div class="vca-flexbox"><vca-textarea v-model="offset.comment" :maxlength="200" :placeholder="$t('tenseconds.comment.placeholder')" label=""/></div>
            </div>
            <button class="vca-button quarter" @click.prevent="">{{ $t('tenseconds.comment.button') }}</button>
        </vca-field>
    </vca-card>
 </template> 
<script>
export default {
    name: 'TenSeconds',
    computed: {
        knownfrom: {
            get () {
                // Translates the titles and labels of the dropdown
                var dropdown = []
                this.$store.state.knownfrom.dropdown.forEach(e => {
                    var temp = {title: this.$t(e.title), label: this.$t(e.label), value: e.value}
                    dropdown.push(temp)
                })
                return {dropdown: dropdown}
            }
        },
        offset: {
            get () {
                return this.$store.state.offset
            },
            set(value) {
                this.$store.commit('offset', value)
            }
        }
    },
    methods: {
        select() {
            console.error("NOT IMPLEMENTED YET")
        }
    }
}
</script>