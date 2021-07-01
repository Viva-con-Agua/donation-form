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
            <button v-if="flow" class="vca-button quarter" @click.prevent="submit">{{ $t('tenseconds.comment.button') }}</button>
            <div class="vca-column" v-else>
                <button class="vca-button quarter" disabled @click.prevent="submit">{{ $t('tenseconds.comment.button') }}</button>
                <div class="primary-dark bold tenseconds-success vca-border text-center quarter">{{ $t('tenseconds.success') }}</div>
            </div>
        </vca-field>
    </vca-card>
 </template> 
<script>
export default {
    name: 'TenSeconds',
    data() {
        return {
            flow: true
        }
    },
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
        submit() {
            this.$store.dispatch({type: 'feedback', data: this.offset})
            .then((resp) => {
                this.flow = false
                console.log(resp)
            })
            .catch((error) => {
                console.log(error)
            })
        },
        select() {
            console.log("todo?")
        }
    }
}
</script>
<style lang="scss">
    .tenseconds-success {
        margin: auto;
    }
    
    .quarter {
        @include media(small) {
            width: 100% !important;
        }
    }
</style>