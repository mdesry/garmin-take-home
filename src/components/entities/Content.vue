<script setup>
const props = defineProps({
  header: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="content">
    <h4 class="text-center">
      {{ props.header }}
    </h4>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.content {
  max-width: 768px;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #333333;
  border-radius: 1rem;

  h4 {
    color: #2980b9;
  }
}
</style>