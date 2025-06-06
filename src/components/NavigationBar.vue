<script setup>
import { RouterLink } from "vue-router";
import LogoSVG from "./SVGs/logoSVG.vue";
</script>

<template>
  <header class="header">
    <RouterLink to="/">
      <LogoSVG :size="75" />
    </RouterLink>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 95%;
  height: 7em;
  padding-left: 0.5em;
  border-bottom: solid 1px #222222;
}
</style>
