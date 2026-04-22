const alunos = JSON.parse(localStorage.getItem("alunos")) || [];

function salvarAluno(){
    const aluno = {
        id: Date.now(),
        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        genero: document.getElementById("generoDropdown").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        dataNascimento: document.getElementById("dataNascimento").value,
        status: "Ativo"
    };

    alunos.push(aluno);

    localStorage.setItem("alunos", JSON.stringify(alunos));

    renderizarTabela();

    fecharModal();

    limparFormulario();
}

function renderizarTabela() {
    const tbody = document.getElementById("tabela-alunos-body");
    tbody.innerHTML = "";

    alunos.forEach(aluno => {
        tbody.innerHTML += `
            <tr>
                <td>${aluno.id}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.email}</td>
                <td>${aluno.genero}</td>
                <td>${aluno.status}</td>
                <td>
                    <button onclick="editarAluno(${aluno.id})" class="btn-editar" data-id="${aluno.id}">Editar</button>
                    <button onclick="visualizarAluno(${aluno.id})" class="btn-visualizar" data-id="${aluno.id}">Visualizar</button>
                </td>
            </tr>
        `;
    });
}

function limparFormulario() {
    document.getElementById("nome").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("generoDropdown").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("dataNascimento").value = "";
}

function fecharModal() {
    document.getElementById("modal-aluno").style.display = "none";
}

document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "btnSalvarAluno") {
        salvarAluno();
    }
});

let alunoSelecionadoId = null;

function visualizarAluno(id) {
    const aluno = alunos.find(a => a.id === id);
    if (!aluno) return;

    const modal = document.getElementById("modal-visualizar-aluno");

    alunoSelecionadoId = id;

    document.getElementById("visualizarNome").textContent = aluno.nome;
    document.getElementById("visualizarCpf").textContent = aluno.cpf;
    document.getElementById("visualizarGenero").textContent = aluno.genero;
    document.getElementById("visualizarEmail").textContent = aluno.email;
    document.getElementById("visualizarTelefone").textContent = aluno.telefone;
    document.getElementById("visualizarDataNascimento").textContent = aluno.dataNascimento;
    document.getElementById("visualizarStatus").textContent = aluno.status;

    modal.style.display = "flex";

}

function excluirAluno(id) {

    const index = alunos.findIndex(a => a.id === alunoSelecionadoId);
    if (index !== - 1){
        alunos.splice(index, 1);
    }

    localStorage.setItem("alunos", JSON.stringify(alunos));

    document.getElementById("modal-visualizar-aluno").style.display = "none";

    renderizarTabela();

}

document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "btnExcluirModal") {
        excluirAluno();
    }
});

renderizarTabela();