<script setup>
import { RouterView } from 'vue-router';
import NavigationBar from './components/NavigationBar.vue';
</script>

<template>
  <div class="app">
    <NavigationBar />
    <RouterView />
  </div>
</template>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}

.app {
  font-size: 12px;
  font-family: $font-primary-text;
}
</style>
