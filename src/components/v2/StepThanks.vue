<template>
    <div>
        <Thanks />
        <Newsletter />
        <TenSeconds />
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import Thanks from "@/components/v2/steps/four/Thanks";
import TenSeconds from "@/components/v2/steps/four/TenSeconds";
import EventBus from "@/event-bus";
import Newsletter from "./steps/four/Newsletter.vue";
export default {
    name: "StepThanks",
    components: { Thanks, Newsletter, TenSeconds },
    computed: {
        ...mapGetters({
            setting: "setting",
        }),
    },
    mounted() {
        EventBus.$emit("interaction")
    }
};
</script>
