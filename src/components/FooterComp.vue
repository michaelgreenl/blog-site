<template>
  <footer class="footer">
    <span class="footer-text">
      © 2025 theblog |
      <a rel="license" target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">Terms of Use</a>
    </span>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  width: 100%;
  display: flex;
  justify-content: end;
  margin-top: auto;
  padding: 8px 12px;
}

.footer-text {
  color: $color-text-secondary;
  font-size: 0.75em;
}

a {
  color: $color-text-secondary;
  text-decoration: underline;
}
</style>
