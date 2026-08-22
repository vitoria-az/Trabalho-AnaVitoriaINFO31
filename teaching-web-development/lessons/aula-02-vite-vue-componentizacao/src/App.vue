<script setup>
import AppHeader from './components/AppHeader.vue'
import ProjectCard from './components/ProjectCard.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <div class="page-shell">
    <AppHeader />

    <main>
      <ProjectCard />
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.page-shell {
  max-width: 420px;
  margin: 0 auto;
  padding: 24px 16px;
  font-family: Arial, sans-serif;
}
</style>