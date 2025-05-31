<template>
  <svg xmlns="http://www.w3.org/2000/svg" :class="svgClass" :style="svgStyle">
    <text x="80" y="42" class="binary-char" :fill="textColor">01100010</text>
    <text x="80" y="69" class="binary-char" :fill="textColor">01101100</text>
    <text x="80" y="96" class="binary-char" :fill="textColor">01101111</text>
    <text x="80" y="123" class="binary-char" :fill="textColor">01100111</text>
  </svg>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  svgClass: String,
  svgStyle: Object,
  textColor: {
    type: String,
    default: '#fff'
  },
  backgroundColor: {
    type: String,
    default: '#F0F0F0'
  },
  borderColor: {
    type: String,
    default: '#D0D0D0'
  }
});
</script>

<style scoped>
.binary-char {
  font-family: 'Consolas', 'Menlo', 'Courier New', Courier, monospace;
  font-size: 22px;
  text-anchor: middle;
}

svg {
  width: 160px;
  height: 150px;
}
</style>
