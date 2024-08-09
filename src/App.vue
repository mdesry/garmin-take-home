<script setup>
import { provide } from 'vue';

const capitalize = (name) => name.charAt(0).toUpperCase() + name.slice(1);

provide('capitalize', capitalize);
</script>
<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
</style>