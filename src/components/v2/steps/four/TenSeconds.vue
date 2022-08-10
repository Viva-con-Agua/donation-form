<template>
    <vca-card>
        <vca-field :label="$t('tenseconds.label')">
            <div class="button-wrapper">
                <vca-column>
                    <h4 v-html="$t('tenseconds.knownfrom.label')"></h4>
                    <vca-dropdown
                        v-model="offset.known_from"
                        :options="knownfrom.dropdown"
                        :placeholder="
                            $t('tenseconds.knownfrom.dropdown.placeholder')
                        "
                        title="Dropdown"
                        label=""
                    />
                </vca-column>
                <vca-column>
                    <h4 v-html="$t('tenseconds.comment.label')"></h4>
                    <vca-textarea
                        ref="comment"
                        :rules="$v.offset.comment"
                        :errorMsg="$t('tenseconds.comment.error')"
                        v-model="offset.comment"
                        :maxlength="200"
                        class="text-area"
                        :placeholder="$t('tenseconds.comment.placeholder')"
                        label=""
                    />
                </vca-column>
                <button
                    v-if="flow"
                    class="vca-button quarter navigation"
                    @click.prevent="submit"
                >
                    {{ $t("tenseconds.comment.button") }}
                </button>
                <div class="vca-column" v-else>
                    <button
                        class="vca-button quarter navigation"
                        disabled
                        @click.prevent="submit"
                    >
                        {{ $t("tenseconds.comment.button") }}
                    </button>
                    <div
                        class="
                            primary-dark
                            bold
                            tenseconds-success
                            vca-border
                            text-center
                        "
                    >
                        {{ $t("tenseconds.success") }}
                    </div>
                </div>
            </div>
        </vca-field>
    </vca-card>
</template>
<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
    name: "TenSeconds",
    data() {
        return {
            flow: true,
        };
    },
    computed: {
        knownfrom: {
            get() {
                // Translates the titles and labels of the dropdown
                var dropdown = [];
                this.$store.state.knownfrom.dropdown.forEach((e) => {
                    var temp = {
                        title: this.$t(e.title),
                        label: this.$t(e.label),
                        value: e.value,
                    };
                    dropdown.push(temp);
                });
                return { dropdown: dropdown };
            },
        },
        ...mapGetters({
            setting: "setting",
        }),
        offset: {
            get() {
                return this.$store.state.offset;
            },
        },
    },
    watch: {
        offset: {
            handler(val) {
                this.$store.commit("offset", val);
            },
            deep: true,
        },
    },
    validations() {
        return {
            offset: {
                comment: {
                    required,
                },
            },
        };
    },
    methods: {
        submit() {
            this.gtmTrack(
                "click",
                "StepFour Feedback-Contact-Us donation-form",
                0
            );
            this.$refs.comment.validate();

            if (this.$v.$invalid) {
                return;
            }
            this.$store
                .dispatch({ type: "feedback" })
                .then((resp) => {
                    this.flow = false;
                    console.log(resp);
                })
                .catch((error) => {
                    console.log(error);
                });

            this.$store
                .dispatch({ type: "contact" })
                .then((resp) => {
                    this.flow = false;
                    console.log(resp);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>
<style lang="scss" scoped>
.tenseconds-success {
    margin: auto;
}

.quarter {
    @include media(small) {
        width: 75% !important;
    }
}
</style>
<style lang="scss">
.text-area textarea {
    height: 150px;
}
</style>
