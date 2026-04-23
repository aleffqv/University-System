const alunos = JSON.parse(localStorage.getItem("alunos")) || [];

let alunoSelecionadoId = null;
let modoEdicao = false;

function salvarAluno(){

    if (modoEdicao) {

        const aluno = alunos.find(a => a.id == alunoSelecionadoId);

        if (aluno) {
            aluno.nome = document.getElementById("nome").value;
            aluno.cpf = document.getElementById("cpf").value;
            aluno.genero = document.getElementById("generoDropdown").value;
            aluno.email = document.getElementById("email").value;
            aluno.telefone = document.getElementById("telefone").value;
            aluno.dataNascimento = document.getElementById("dataNascimento").value;
        }

        modoEdicao = false;
        
        document.getElementById("btnSalvarAluno").textContent = "Cadastrar";
        
    } else {

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
    }

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
    //resta estado de edicao
    modoEdicao = false;
    document.getElementById("btnSalvarAluno").textContent = "Cadastrar"; //deixa o botao como estava antes
}

document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "btnSalvarAluno") {
        salvarAluno();
    }
});



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

function editarAluno(id) {
    alunoSelecionadoId = id;
    const aluno = alunos.find(a =>a.id == alunoSelecionadoId);
    
    if (!aluno) return;

    document.getElementById("nome").value = aluno.nome;
    document.getElementById("cpf").value = aluno.cpf;
    document.getElementById("generoDropdown").value = aluno.genero;
    document.getElementById("email").value = aluno.email;
    document.getElementById("telefone").value = aluno.telefone;
    document.getElementById("dataNascimento").value = aluno.dataNascimento;

    modoEdicao = true;
    document.getElementById("btnSalvarAluno").textContent = "Salvar";

    //OBSSS 
    document.getElementById("modal-visualizar-aluno").style.display = "none";

    document.getElementById("modal-aluno").style.display = "flex";

}

renderizarTabela();