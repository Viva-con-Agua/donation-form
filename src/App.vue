<template>
  <div id="app">
    <notifications position="top center" width="100%"/>
    <PaymentWidget id="app-content" type="membership" slider="" campaign_id=26 campaign_name="Online-Becherspende für Test" campaign_description="Das ist ein Test für eine Online-Becherspende" country="DE" currency="EUR" product="prod_HZW4PLYJeuxnyC" req_newsletter></PaymentWidget>
  </div>
</template>

<script>
import PaymentWidget from '@/PaymentWidget.vue'

export default {
  name: 'App',
  components: { PaymentWidget }
}
</script>