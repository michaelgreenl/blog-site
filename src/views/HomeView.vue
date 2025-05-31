<script setup>
import { ref, onMounted } from 'vue';
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
    <h1>My Blog</h1>
    <div v-if="isLoading">Loading posts...</div>
    <ul v-else>
      <li v-for="post in posts" :key="post.slug">
        <router-link :to="{ name: 'Post', params: { slug: post.slug } }">
          <h2>{{ post.title }}</h2>
        </router-link>
        <p v-if="post.description">{{ post.description }}</p>
        <p v-if="post.date">{{ new Date(post.date).toLocaleDateString() }}</p>
      </li>
    </ul>
  </div>
</template>
