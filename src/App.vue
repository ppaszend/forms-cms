<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <router-link :to="{ name: 'forms-all' }">Forms</router-link>
  </header>

  <RouterView />
</template>

<style lang="scss" scoped>
header {
  display: flex;
  height: 48px;
}
</style>
