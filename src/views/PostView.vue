<script setup>
import { ref, watchEffect, nextTick } from 'vue';
import MdPost from "@/components/MdPost.vue";
import matter from 'gray-matter';
import Prism from 'prismjs';

// Languages for syntax highlighting
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';

// Syntax highlighting theme
// import 'prismjs/themes/prism-okaidia.css';

const props = defineProps({
  slug: String
});

const postContent = ref('');
const frontmatter = ref({});
const isLoading = ref(true);
const error = ref(null);

const loadPost = async (slug) => {
  if (!slug) {
    error.value = 'No post specified.';
    isLoading.value = false;
    return;
  }

  isLoading.value = true;
  error.value = null;
  postContent.value = '';
  frontmatter.value = {};

  try {
    // Vite specific: Dynamically import the .md file as a raw string
    const mdModule = await import(`../assets/posts/${slug}.md?raw`);
    const rawMd = mdModule.default; // The raw string content

    const { data, content } = matter(rawMd); // Parse frontmatter and content
    frontmatter.value = data;
    postContent.value = content;

  } catch (e) {
    console.error(`Failed to load post: ${slug}.md`, e);
    error.value = `Could not load the post "${slug}". It might not exist or there was an error.`;
  } finally {
    isLoading.value = false;
  }
};

// Watch for changes in the slug prop (e.g., navigating between posts)
watchEffect(() => {
  if (props.slug) {
    loadPost(props.slug);
  }
});

// Watch for content to be loaded and then apply highlighting
watchEffect(() => {
  if (!isLoading.value && postContent.value) {
    nextTick(() => {
      Prism.highlightAll();
    });
  }
});
</script>

<template>
  <div class="post-container">
    <div v-if="isLoading" class="loading">Loading post...</div>
    <div v-else-if="error" class="error-message">
      <h2>Oops!</h2>
      <p>{{ error }}</p>
    </div>
    <MdPost v-else-if="postContent" :frontmatter="frontmatter" :postContent="postContent" />
    <div v-else class="not-found">
      <p>Post not found.</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.loading,
.not-found {
  color: $color-text-secondary;
  text-align: center;
  padding: 48px 0;
}

.error-message {
  color: #f85149; // GitHub's error color
  background-color: rgba(248, 81, 73, 0.1);
  border: 1px solid rgba(248, 81, 73, 0.4);
  padding: 16px;
  border-radius: 6px;
  text-align: center;
}
</style>
