<template>
  <div id="app">
    <notifications position="top center" width="100%"/>
    <PaymentWidget class="app-content" :campaign_id="26"></PaymentWidget>
  </div>
</template>

<script>
import PaymentWidget from '@/views/PaymentWidget.vue'

export default {
  name: 'App',
  components: { PaymentWidget }
}
</script>