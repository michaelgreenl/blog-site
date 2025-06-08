<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  post: Object,
});

const showMore = ref(false);
const TRUNCATE_LENGTH = 100;

const isLongDescription = computed(() => {
  return props.post.description && props.post.description.length > TRUNCATE_LENGTH;
});

const displayDescription = computed(() => {
  if (!isLongDescription.value || showMore.value) {
    return props.post.description;
  }
  return props.post.description.substring(0, TRUNCATE_LENGTH) + '...';
});

function toggleShowMore() {
  showMore.value = !showMore.value;
}
</script>

<template>
  <div class="post-card">
    <div class="main-content">
      <router-link class="title-link" :to="{ name: 'Post', params: { slug: props.post.slug } }">
        <h2>{{ props.post.title }}</h2>
      </router-link>

      <div class="tags-container" v-if="props.post.tags && props.post.tags.length">
        <span v-for="tag in props.post.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>

      <p v-if="props.post.description" class="description">
        {{ displayDescription }}
        <span v-if="isLongDescription" @click="toggleShowMore" class="toggle-button">
          {{ showMore ? 'Show Less' : 'Show More' }}
        </span>
      </p>
    </div>
    <div class="meta-date" v-if="props.post.date">
      {{ new Date(props.post.date).toLocaleDateString() }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px 0;
  border-top: 1px solid $color-border-primary;
}

.main-content {
  flex-grow: 1;
}

.title-link {
  text-decoration: none;

  h2 {
    font-size: 1.25em;
    font-weight: 600;
    color: $color-text-link;
    margin: 0 0 8px 0;
    display: inline-block;

    &:hover {
      text-decoration: underline;
    }
  }
}

.tags-container {
  margin-bottom: 8px;
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
  transition: background-color 0.2s ease;

  &:hover {
    background-color: $color-tag-hover-bg;
  }
}

.description {
  color: $color-text-secondary;
  margin: 0;
}

.toggle-button {
  color: $color-text-link;
  cursor: pointer;
  font-weight: 600;
  margin-left: 8px;
}

.meta-date {
  font-size: 0.9em;
  color: $color-text-secondary;
  white-space: nowrap;
  margin-left: 16px;
  padding-top: 2px; // Align with title
}
</style>
