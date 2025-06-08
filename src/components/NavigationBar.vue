<script setup>
import { RouterLink } from 'vue-router';
import LogoSVG from './svgs/LogoSVG.vue';
</script>

<template>
  <header class="header">
    <div class="header-content">
      <RouterLink class="nav-link" to="/">
        <LogoSVG size="75" />
      </RouterLink>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  background-color: $color-bg-secondary;
  border-bottom: 1px solid $color-border-primary;
  padding: 0.5em 1em;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 75px;
  margin: 0 auto;
}

.nav-link {
  height: 100%;
}
</style>
