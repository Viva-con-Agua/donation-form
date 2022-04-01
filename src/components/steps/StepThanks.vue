<template>
    <div>

        <Thanks/>
        <Next/>
        <TenSeconds v-if="setting != 'nwt'"/>

    </div>
 </template>
<script>
import { mapGetters } from 'vuex'
import Thanks from '@/components/steps/four/Thanks'
import Next from '@/components/steps/four/Next'
import TenSeconds from '@/components/steps/four/TenSeconds'
export default {
    name: 'StepThanks',
    components: {Thanks, Next, TenSeconds},
    computed: {
       ...mapGetters({
           setting: 'setting'
       })
   }
}
</script>