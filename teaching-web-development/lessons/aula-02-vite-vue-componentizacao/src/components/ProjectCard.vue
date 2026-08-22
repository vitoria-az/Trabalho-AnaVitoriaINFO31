<template>
  <article class="project-card">
    <p class="label">Desafio inicial</p>
    <h2>Problema observado</h2>
    <p>Como tornar as informações do projeto mais claras para a comunidade?</p>
    <button type="button">Marcar interesse</button>
  </article>
</template>

<style scoped>
.project-card {
  padding: 24px;
  background: #f0f4f8;
  border-left: 8px solid #1B365D;
  border-radius: 8px;
}

.project-card h2 {
  margin: 0;
  color: #0f172a;
}

.project-card > p:not(.label) {
  margin: 12px 0 20px;
  line-height: 1.6;
  color: #334155;
}

.label {
  margin: 0 0 8px;
  color: #2563EB;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

button {
  padding: 12px 18px;
  color: #ffffff;
  font-weight: 700;
  background: #1B365D;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background: #0f2342;
}

button:focus-visible {
  outline: 3px solid #2563EB;
  outline-offset: 3px;
}
</style>