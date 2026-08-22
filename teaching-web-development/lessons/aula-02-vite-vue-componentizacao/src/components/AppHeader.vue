<template>
  <header class="app-header">
    <p class="eyebrow">IFMA · Projeto Integrador</p>
    <h1>Sua Solução Inovadora</h1>
    <p>Primeiro protótipo organizado com Vue 3.</p>
  </header>
</template>

<style scoped>
.app-header {
  padding-block: 24px;
  border-bottom: 1px solid #d9e2dc;
}

.app-header h1 {
  margin: 0;
  color: #2c3e50;
}

.app-header > p:last-child {
  margin: 12px 0 0;
  line-height: 1.6;
  color: #555555;
}

.eyebrow {
  margin: 0 0 8px;
  color: #4682B4;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
</style>