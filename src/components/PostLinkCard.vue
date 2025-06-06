<script setup>
const props = defineProps({
  posts: Object,
});
</script>

<template>
  <li v-for="post in props.posts" :key="post.slug">
    <router-link :to="{ name: 'Post', params: { slug: post.slug } }">
      <h2>{{ post.title }}</h2>
    </router-link>
    <!-- TODO: Add showMore logic for descriptions -->
    <p v-if="post.description">{{ post.description }}</p>
    <p v-if="post.date">{{ new Date(post.date).toLocaleDateString() }}</p>
  </li>
</template>

<style lang="scss" scoped></style>
