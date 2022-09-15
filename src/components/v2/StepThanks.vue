<template>
    <div>
        <Thanks />
        <Next />
        <TenSeconds />
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import Thanks from "@/components/v2/steps/four/Thanks";
import Next from "@/components/v2/steps/four/Next";
import TenSeconds from "@/components/v2/steps/four/TenSeconds";
import EventBus from "@/event-bus";
export default {
    name: "StepThanks",
    components: { Thanks, Next, TenSeconds },
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
