<script setup>
import { ref, watchEffect, computed, nextTick } from 'vue';
import { marked } from 'marked';
import matter from 'gray-matter';
import Prism from 'prismjs';

// Languages for syntax highlighting
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';

// Syntax highlighting theme
import 'prismjs/themes/prism-okaidia.css';

const props = defineProps({
  slug: String
});

marked.setOptions({
  gfm: true,
  breaks: true,
});

const postContent = ref('');
const frontmatter = ref({});
const isLoading = ref(true);
const error = ref(null);

// Use a computed property for the final HTML to be rendered
const renderedMarkdown = computed(() => {
  if (postContent.value) {
    return marked(postContent.value);
  }
  return '';
});

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
    if (e.message.includes('Unknown variable dynamic import')) {
      error.value += ' (Check if the file exists in src/posts/ and the slug is correct)'
    }
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

const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>

<template>
  <div class="post-container">
    <div v-if="isLoading" class="loading">Loading post...</div>
    <div v-else-if="error" class="error-message">
      <h2>Oops!</h2>
      <p>{{ error }}</p>
    </div>
    <article v-else-if="postContent" class="blog-post">
      <header v-if="frontmatter.title">
        <h1>{{ frontmatter.title }}</h1>
        <p v-if="frontmatter.date" class="post-meta">Published on {{ formatDate(frontmatter.date) }}</p>
        <div v-if="frontmatter.tags && frontmatter.tags.length" class="tags">
          Tags: <span v-for="tag in frontmatter.tags" :key="tag" class="tag">#{{ tag }}&nbsp;</span>
        </div>
      </header>
      <div v-html="renderedMarkdown"></div>
    </article>
    <div v-else class="not-found">
      <p>Post not found.</p>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
