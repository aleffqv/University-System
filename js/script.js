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

// Aguarda o DOM carregar completamente
document.addEventListener("DOMContentLoaded", function() {
    // Verifica se os dados existem no localStorage
    if (!localStorage.getItem("turmas")) {
        localStorage.setItem("turmas", JSON.stringify([]));
    }
    if (!localStorage.getItem("matriculas")) {
        localStorage.setItem("matriculas", JSON.stringify([]));
    }
    if (!localStorage.getItem("alunos")) {
        localStorage.setItem("alunos", JSON.stringify([]));
    }
    if (!localStorage.getItem("cursos")) {
        localStorage.setItem("cursos", JSON.stringify([]));
    }
    if (!localStorage.getItem("professores")) {
        localStorage.setItem("professores", JSON.stringify([]));
    }
    if (!localStorage.getItem("disciplinas")) {
        localStorage.setItem("disciplinas", JSON.stringify([]));
    }
    
    // Renderiza ambas as tabelas após garantir que todos os dados existem
    if (typeof renderizarTabelaTurmas === 'function') {
        renderizarTabelaTurmas();
    }
    
    if (typeof renderizarTabelaMatriculas === 'function') {
        renderizarTabelaMatriculas();
    }
});