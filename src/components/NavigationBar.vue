<script setup>
import { RouterLink } from "vue-router";
import LogoSVG from "./SVGs/logoSVG.vue";
</script>

<template>
  <header>
    <RouterLink to="/">
      <LogoSVG />
    </RouterLink>
  </header>
</template>
