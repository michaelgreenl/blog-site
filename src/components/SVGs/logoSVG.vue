<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="Number(size) * (150 / 150)" viewBox="0 0 150 150"
    role="img" aria-labelledby="logoTitle">
    <text x="75" y="42" class="binary-char" :fill="textColor">01100010</text>
    <text x="75" y="69" class="binary-char" :fill="textColor">01101100</text>
    <text x="75" y="96" class="binary-char" :fill="textColor">01101111</text>
    <text x="75" y="123" class="binary-char" :fill="textColor">01100111</text>
  </svg>
</template>

<script setup>
defineProps({
  size: {
    type: [Number, String],
    default: 150
  },
  textColor: {
    type: String,
    default: '#fff'
  },
});
</script>

<style scoped>
.binary-char {
  font-family: 'Consolas', 'Menlo', 'Courier New', Courier, monospace;
  font-size: 22px;
  text-anchor: middle;
}
</style>
