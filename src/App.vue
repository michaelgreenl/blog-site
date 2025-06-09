<script setup>
import NavigationBar from './components/NavigationBar.vue';
import FooterComp from './components/FooterComp.vue';
</script>

<template>
  <div class="app-container">
    <NavigationBar />
    <main class="main-content">
      <router-view />
    </main>
    <FooterComp />
  </div>
</template>

<style lang="scss">
// Global Reset and Base Styles
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background-color: $color-bg-primary;
  color: $color-text-primary;
  font-family: $font-primary-text;
  font-size: 16px;
  line-height: 1.5;
}

a {
  color: $color-text-link;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  width: 100%;
  max-width: 1260px;
  margin: 0 auto;
  padding: 1.5em 1.5em;
}
</style>
