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
  <div>
    <div class="post-link">
      <router-link :to="{ name: 'Post', params: { slug: props.post.slug } }">
        <h2>{{ props.post.title }}</h2>
      </router-link>
      <p v-if="props.post.date">{{ new Date(props.post.date).toLocaleDateString() }}</p>
    </div>
    <div>
      Tags: <span v-for="tag in props.post.tags" :key="tag" class="tag">#{{ tag }}&nbsp;</span>
    </div>
    <p v-if="props.post.description">
      {{ displayDescription }}
      <span v-if="isLongDescription" @click="toggleShowMore" class="show-more">
        {{ showMore ? 'Show Less' : 'Show More' }}
      </span>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.post-link {
  display: flex;
  justify-content: space-between;
}

.show-more {
  cursor: pointer;
  font-weight: bold;
  color: #aaa;
}
</style>
