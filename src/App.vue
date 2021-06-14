<template>
  <div id="app">
    <notifications position="top center" width="100%"/>
    <router-view class="app-content"/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>