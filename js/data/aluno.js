const API_ALUNOS = "http://localhost:8080/alunos";
const API_CURSOS = "http://localhost:8080/cursos";

let alunoSelecionadoId = null;
let modoEdicaoAluno = false;

async function salvarAluno(){

    const aluno = {
            nome: document.getElementById("nome").value,
            cpf: document.getElementById("cpf").value,
            genero: document.getElementById("generoDropdown").value,
            email: document.getElementById("email").value,
            telefone: document.getElementById("telefone").value,
            dataNascimento: document.getElementById("dataNascimento").value,
            cursoId: null,
            status: "ATIVO"
        };

    if (modoEdicaoAluno) {

        await fetch(`${API_ALUNOS}/${alunoSelecionadoId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(aluno)
        });

        modoEdicaoAluno = false;
        
        document.getElementById("btnSalvarAluno").textContent = "Cadastrar";
        
    } else {

        await fetch(API_ALUNOS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(aluno)
        });
    }

    renderizarTabela();

    fecharModal();

    limparFormulario();
}

async function renderizarTabela() {
    
    const response = await fetch(API_ALUNOS);

    const alunos = await response.json();

    const tbody = document.getElementById("tabela-alunos-body");

    //if (!tbody) return;
    
    tbody.innerHTML = "";

    alunos.forEach(aluno => {
        tbody.innerHTML += `
            <tr>
                <td>${aluno.id}</td>
                <td>${aluno.pessoa.nome}</td>
                <td>${aluno.curso ? aluno.curso.nome : "Sem curso"}</td>
                <td>${aluno.pessoa.genero}</td>
                <td>${aluno.pessoa.status}</td>
                <td>
                    <button onclick="editarAluno(${aluno.id})" class="btn-icone btn-editar" title="Editar"></button>
                    <button onclick="visualizarAluno(${aluno.id})" class="btn-icone btn-visualizar" data-id="${aluno.id}"></button>
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
    document.getElementById("cursoDropdown").value = "";
}

function fecharModal() {
    document.getElementById("modal-aluno").style.display = "none";
    //resta estado de edicao
    modoEdicaoAluno = false;
    document.getElementById("btnSalvarAluno").textContent = "Cadastrar"; //deixa o botao como estava antes
}

//botão de salvar
document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "btnSalvarAluno") {
        salvarAluno();
    }
});



async function visualizarAluno(id) {

    const response = await fetch(`${API_ALUNOS}/${id}`);

    const aluno = await response.json();

    const modal = document.getElementById("modal-visualizar-aluno");

    alunoSelecionadoId = id;

    document.getElementById("visualizarNome").textContent = aluno.pessoa.nome;
    document.getElementById("visualizarCpf").textContent = aluno.pessoa.cpf;
    document.getElementById("visualizarGenero").textContent = aluno.pessoa.genero;
    document.getElementById("visualizarEmail").textContent = aluno.pessoa.email;
    document.getElementById("visualizarTelefone").textContent = aluno.pessoa.telefone;
    document.getElementById("visualizarDataNascimento").textContent = aluno.pessoa.dataNascimento;
    document.getElementById("visualizarStatus").textContent = aluno.pessoa.status;

    modal.style.display = "flex";

}

async function excluirAluno(id) {

    await fetch(`${API_ALUNOS}/${alunoSelecionadoId}`, {
        method: "DELETE"
    });
    document.getElementById("modal-visualizar-aluno").style.display = "none";

    renderizarTabela();

}

//BOTÃO DE EXCLUIR ALUNO DENTRO DO MODAL DE VISUALIZAR ALUNO
document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "btnExcluirModal") {
        excluirAluno();
    }
});

//BOTÃO DE EDITAR ALUNO DENTRO DO MODAL DE VISUALIZAR ALUNO
document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "btnEditarModal") {
        editarAluno(alunoSelecionadoId);
    }
});

async function editarAluno(id) {

    const response = await fetch(`${API_ALUNOS}/${id}`);

    const aluno = await response.json();
    
    if (!aluno) return;

    alunoSelecionadoId = id;

    document.getElementById("nome").value = aluno.pessoa.nome;
    document.getElementById("cpf").value = aluno.pessoa.cpf;
    document.getElementById("generoDropdown").value = aluno.pessoa.genero;
    document.getElementById("email").value = aluno.pessoa.email;
    document.getElementById("telefone").value = aluno.pessoa.telefone;
    document.getElementById("dataNascimento").value = aluno.pessoa.dataNascimento;

    modoEdicaoAluno = true;

    document.getElementById("btnSalvarAluno").textContent = "Salvar";

    //OBSSS 
    document.getElementById("modal-visualizar-aluno").style.display = "none";

    document.getElementById("modal-aluno").style.display = "flex";

}


async function matricularAlunoCurso(alunoId, cursoId) {

    await fetch(`${API_ALUNOS}/${alunoId}/curso/${cursoId}`, {
        method: "PUT"
    });

    alert("Aluno matriculado no curso!");

    renderizarTabela();
}

//botao matr curso
document.addEventListener("click", function(e){
    if (e.target && e.target.id === "btnMatricularCurso") {

        const alunoId = document.getElementById("alunoDropdown").value;
        const cursoId = document.getElementById("cursoMatriculaDropdown").value;

        matricularAlunoCurso(alunoId, cursoId);
    }
});


async function carregarAlunosDropdown(selectId) {

    const response = await fetch(API_ALUNOS);

    const alunos = await response.json();

    const select = document.getElementById(selectId);

    if (!select) return;

    select.innerHTML = '<option value="">Selecione um aluno</option>';

    alunos.forEach(a => {
        select.innerHTML += `
            <option value="${a.id}">
                ${a.pessoa.nome}
            </option>
        `;
    });
}

async function carregarCursosDropdown(selectId) {

    const response = await fetch(API_CURSOS);

    const cursos = await response.json();

    const select = document.getElementById(selectId);

    select.innerHTML = '<option value="">Selecione um curso</option>';

    cursos.forEach(c => {
        select.innerHTML += `
            <option value="${c.id}">
                ${c.nome}
            </option>
        `;
    });
}

async function carregarTurmasAlunoDropdown(selectId, alunoId) {

    const responseAlunos = await fetch(`${API_ALUNOS}/${alunoId}`);
    const aluno = await responseAlunos.json();

    const responseTurmas = await fetch("http://localhost:8080/turmas");
    const turmas = await responseTurmas.json();

    const select = document.getElementById(selectId);

    if (!aluno.curso) {
        select.innerHTML = '<option value="">Selecione um aluno primeiro</option>';
        return;
    }

    //vai filtrar pelos cursos
    const turmasFilter = turmas.filter(t => t.disciplina.curso.id === aluno.curso.id);

    select.innerHTML = '<option value="">Selecione uma turma</option>';

    turmasFilter.forEach(t => {
        select.innerHTML += `
            <option value="${t.id}">
                ${t.nome} - ${t.disciplina.nome}
            </option>
        `;
    });
}


document.addEventListener("DOMContentLoaded", function () {

    carregarAlunosDropdown("alunoDropdown");

    carregarAlunosDropdown("alunoTurmaDropdown");

    carregarCursosDropdown("cursoMatriculaDropdown");

    const alunoSelect =
        document.getElementById("alunoTurmaDropdown");

    alunoSelect.addEventListener("change", function () {

        carregarTurmasAlunoDropdown(
            "turmaDropdown",
            this.value
        );
    });
});


// Só executa se a página tiver a tabela de alunos
if (document.getElementById("tabela-alunos-body")) {
    renderizarTabela();
}