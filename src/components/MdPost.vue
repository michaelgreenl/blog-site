<script setup>
import { computed } from 'vue';
import { marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id'

const props = defineProps({
  frontmatter: Object,
  postContent: String,
});

marked.use(gfmHeadingId());

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
  <article v-if="props.postContent" class="post-content">
    <header class="post-header">
      <h1>{{ props.frontmatter.title }}</h1>
      <p class="post-meta">
        Published on {{ formatDate(props.frontmatter.date) }}
      </p>
      <div v-if="props.frontmatter.tags && props.frontmatter.tags.length" class="tags-container">
        <span v-for="tag in props.frontmatter.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </header>
    <div class="markdown-body" v-html="renderedMarkdown"></div>
  </article>
</template>

<style scoped lang="scss">
.post-header {
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid $color-border-primary;

  h1 {
    font-size: 2.25em;
    font-weight: 600;
    margin: 0 0 8px 0;
    line-height: 1.2;
  }

  .post-meta {
    color: $color-text-secondary;
    font-size: 1em;
    margin: 0 0 16px 0;
  }
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  font-size: 0.8em;
  font-weight: 500;
  color: $color-text-link;
  background-color: $color-tag-bg;
  padding: 4px 8px;
  border-radius: 2em;
}

.markdown-body {

  :deep(h3) {
    font-size: 1.15em;
    margin-bottom: 4px;
    font-weight: 600;
  }

  :deep(blockquote) {
    margin: 0 0 16px;
    padding: 0 1em;
    border-left: .25em solid $color-border-primary;

    &>p {
      font-style: italic;
      color: $color-text-secondary;
    }
  }
}
</style>
