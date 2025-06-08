<script setup>
import { ref, onMounted } from 'vue';
import PostLinkCard from '@/components/PostLinkCard.vue';
import matter from 'gray-matter';

const posts = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  // Vite's import.meta.glob to get all .md files
  const mdModules = import.meta.glob('../assets/posts/*.md', { query: '?raw', import: 'default' });
  const loadedPosts = [];

  for (const path in mdModules) {
    try {
      const rawContent = await mdModules[path](); // mdModules[path] is a function that returns a Promise for the content
      const { data } = matter(rawContent); // Parse frontmatter
      const slug = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.md'));

      loadedPosts.push({
        slug,
        title: data.title || 'Untitled Post',
        date: data.date,
        description: data.description,
        tags: data.tags,
      });
    } catch (e) {
      console.error("Error processing post for list:", path, e);
    }
  }
  // Sort posts, e.g., by date
  posts.value = loadedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  isLoading.value = false;
});
</script>

<template>
  <div>
    <h1 class="page-title">My Blog</h1>
    <div v-if="isLoading">Loading posts...</div>
    <ul v-else class="post-list">
      <li v-for="post in posts" :key="post.slug">
        <PostLinkCard :post="post" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.page-title {
  font-size: 2em;
  font-weight: 600;
  margin-bottom: 24px;
  padding-bottom: 8px;
  border-bottom: 1px solid $color-border-primary;
}

.post-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
