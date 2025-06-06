<script setup>
import { computed } from 'vue';
import { marked } from 'marked';

const props = defineProps({
  frontmatter: Object,
  postContent: String,
});

marked.setOptions({
  gfm: true,
  breaks: true,
});

// Use a computed property for the final HTML to be rendered
const renderedMarkdown = computed(() => {
  if (props.postContent) {
    return marked(props.postContent);
  }
  return '';
});

const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>

<template>
  <article v-if="props.postContent" class="blog-post">
    <header v-if="props.frontmatter.title">
      <h1>{{ props.frontmatter.title }}</h1>
      <p v-if="props.frontmatter.date" class="post-meta">Published on {{ formatDate(frontmatter.date) }}</p>
      <div v-if="props.frontmatter.tags && frontmatter.tags.length" class="tags">
        Tags: <span v-for="tag in props.frontmatter.tags" :key="tag" class="tag">#{{ tag }}&nbsp;</span>
      </div>
    </header>
    <div v-html="renderedMarkdown"></div>
  </article>
</template>

<style lang="scss" scoped></style>
