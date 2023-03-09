<template>
    <div class="steptwo">
        <ContactTypeSelect />
        <ContactForm ref="contactdata" class="button-wrapper" />
        <PublishCheckbox v-if="setting == 'v2Twitch'"/>
        <button
            class="vca-button navigation"
            @click="submit"
            :disabled="!isValid"
        >
            {{ $t("buttons.next") }}
        </button>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import ContactTypeSelect from "@/components/v2/steps/two/ContactTypeSelect";
import ContactForm from "@/components/steps/two/ContactForm";
import PublishCheckbox from '@/components/v2/steps/two/PublishCheckbox'
export default {
    name: "StepTwoV2",
    components: {
        ContactTypeSelect,
        ContactForm,
    },
    data() {
        return {
            isValid: true,
        };
    },
    mounted() {
        this.isValid = !this.$refs.contactdata.$v.$invalid;
        this.$watch(
            () => {
                return this.$refs.contactdata.$v.$invalid;
            },
            (val) => {
                this.isValid = !val;
            }
        );
    },
    computed: {
        ...mapGetters({
            setting: "setting",
        }),
    },
    methods: {
        back() {
            this.$emit("back");
        },
        submit() {
            this.gtmTrack("click", "StepTwo Next donation-form", 0);
            this.$store
                .dispatch("payment/process")
                .then(() => {
                    this.$emit("submit");
                })
                .catch((err) => console.log(err));
        },
    },
};
</script>
