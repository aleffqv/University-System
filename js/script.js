// js/alunos.js
function carregarAlunos() {
    const tabela = document.getElementById('tabela-alunos');
    if (tabela) {
        tabela.innerHTML = `
            <tr><td>1</td><td>João Silva</td><td>joao@email.com</td><td>Computação</td><td>✏️ 🗑️</td></tr>
            <tr><td>2</td><td>Maria Santos</td><td>maria@email.com</td><td>Matemática</td><td>✏️ 🗑️</td></tr>
        `;
    }
}

function novoAluno() {
    alert('Abrir formulário de novo aluno');
}

// Carregar dados quando a página for inicializada
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', carregarAlunos);
} else {
    carregarAlunos();
}