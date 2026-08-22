<template>
  <div class="page-shell">
    <header class="app-header">
      <p class="eyebrow">IFMA · Projeto Integrador</p>
      <h1>Projeto Integrador Web</h1>
      <p>Primeiro protótipo preparado para componentização.</p>
    </header>

    <main>
      <article class="project-card">
        <p class="label">Desafio inicial</p>
        <h2>Problema observado</h2>
        <p>Como tornar as informações do projeto mais claras para a comunidade?</p>
        <button type="button">Marcar interesse</button>
      </article>
    </main>

    <footer class="app-footer">
      <small>Desenvolvimento de Sistemas Web · IFMA · 2026</small>
    </footer>
  </div>
</template>

<style scoped>
.app-header {
  padding-block: 24px;
  border-bottom: 1px solid #d9e2dc;
}

.app-header h1,
.project-card h2 {
  margin: 0;
  color: #123d27;
}

.eyebrow,
.label {
  margin: 0 0 8px;
  color: #1f8f3a;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
}

.project-card {
  padding: 24px;
  background: #f4f7f5;
  border-left: 8px solid #1f8f3a;
}

button {
  padding: 12px 18px;
  color: #ffffff;
  font-weight: 700;
  background: #005c2e;
  border: 0;
}

.app-footer {
  margin-top: 24px;
  color: #5f6b65;
}
</style>

