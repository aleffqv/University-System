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

renderizarTabela();