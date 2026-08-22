const botao = document.getElementById('acao');
const statusTexto = document.getElementById('status');

botao.addEventListener('click', () => {
    statusTexto.textContent = '✓ Obrigado pelo apoio! Seu interesse foi registrado.';
    botao.style.backgroundColor = '#4682B4';
    botao.textContent = 'Interesse registrado';
    botao.disabled = true;
    botao.style.cursor = 'default';
});

