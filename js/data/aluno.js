const API = "http://localhost:8080/alunos";

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

        await fetch(`${API}/${alunoSelecionadoId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(aluno)
        });

        modoEdicaoAluno = false;
        
        document.getElementById("btnSalvarAluno").textContent = "Cadastrar";
        
    } else {

        await fetch(API, {
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
    
    const response = await fetch(API);

    const alunos = await response.json();

    const tbody = document.getElementById("tabela-alunos-body");
    
    tbody.innerHTML = "";

    alunos.forEach(aluno => {
        tbody.innerHTML += `
            <tr>
                <td>${aluno.id}</td>
                <td>${aluno.pessoa.nome}</td>
                <td>${aluno.getCurso}</td>
                <td>${aluno.pessoa.genero}</td>
                <td>${aluno.pessoa.status}</td>
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

    const response = await fetch(`${API}/${id}`);

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

    await fetch(`${API}/${alunoSelecionadoId}`, {
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

    const response = await fetch(`${API}/${id}`);

    const aluno = await response.json();
    
    if (!aluno) return;

    alunoSelecionadoId = id;

    document.getElementById("visualizarNome").value = aluno.pessoa.nome;
    document.getElementById("visualizarCpf").value = aluno.pessoa.cpf;
    document.getElementById("visualizarGenero").value = aluno.pessoa.genero;
    document.getElementById("visualizarEmail").value = aluno.pessoa.email;
    document.getElementById("visualizarTelefone").value = aluno.pessoa.telefone;
    document.getElementById("visualizarDataNascimento").value = aluno.pessoa.dataNascimento;
    document.getElementById("visualizarStatus").value = aluno.pessoa.status;

    modoEdicaoAluno = true;

    document.getElementById("btnSalvarAluno").textContent = "Salvar";

    //OBSSS 
    document.getElementById("modal-visualizar-aluno").style.display = "none";

    document.getElementById("modal-aluno").style.display = "flex";

}


function matricularAlunoCurso(alunoId, cursoId){
    const alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    const aluno = alunos.find(a => a.id == alunoId);

    if(aluno.cursoId){
        alert("Aluno já matriculado em algum curso");
        return;
    }

    if(aluno.cursoId === cursoId){
        alert("Aluno já matriculado nesse curso");
        return;
    }

    aluno.cursoId = cursoId;

    localStorage.setItem("alunos", JSON.stringify(alunos));
    renderizarTabela();
    alert("Aluno matriculado com sucesso!");
}

//botao matr curso
document.addEventListener("click", function(e){
    if (e.target && e.target.id === "btnMatricularCurso") {

        const alunoId = document.getElementById("alunoDropdown").value;
        const cursoId = document.getElementById("cursoMatriculaDropdown").value;

        matricularAlunoCurso(alunoId, cursoId);
    }
});

function carregarAlunosDropdown(selectId) {
    const select = document.getElementById(selectId);
    const alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    select.innerHTML = '<option value="">Selecione um aluno</option>';

    alunos.forEach(a => {
        select.innerHTML += `
            <option value="${a.id}">
                ${a.nome} - ${getNomeCurso(a.cursoId)}
            </option>
        `;
    });
}

function carregarCursosDropdown(selectId) {
    const select = document.getElementById(selectId);
    const cursos = JSON.parse(localStorage.getItem("cursos")) || [];

    select.innerHTML = '<option value="">Selecione um curso</option>';

    cursos.forEach(c => {
        select.innerHTML += `
            <option value="${c.id}">
                ${c.nomec}
            </option>
        `;
    });
}

function getNomeCurso(id){
    const cursos = JSON.parse(localStorage.getItem("cursos")) || [];
    const curso = cursos.find(c => c.id == id);
    return curso ? curso.nomec: "Nenhum curso encontrado"

}


function carregarTurmasAlunoDropdown(selectId, alunoId) {
    
    const select = document.getElementById(selectId);
    const alunos = JSON.parse(localStorage.getItem("alunos")) || [];
    const turmas = JSON.parse(localStorage.getItem("turmas")) || [];

    if (!alunoId) {
    select.innerHTML = '<option value="">Selecione um aluno primeiro</option>';
    return;
    }

    //procura o aluno, pega do dropdown
    const aluno = alunos.find(a => a.id == alunoId);

    //confere se o aluno existe e está em um curso
    if (!aluno || !aluno.cursoId){
        select.innerHTML = '<option value="">Selecione um aluno com curso</option>';
        return;
    }

    //vai filtrar pelos cursos
    const turmasFilter = turmas.filter(t => t.cursoId === aluno.cursoId);

    select.innerHTML = '<option value="">Selecione uma turma</option>';

    turmasFilter.forEach(t => {
        select.innerHTML += `
            <option value="${t.id}">
                ${t.nomet} - ${getNomeDisciplina(t.disciplinaId)}
            </option>
        `;
    });
}


document.addEventListener("DOMContentLoaded", function () {

    carregarAlunosDropdown("alunoDropdown");
    carregarAlunosDropdown("alunoTurmaDropdown");
    carregarCursosDropdown("cursoMatriculaDropdown");

    const alunoSelect = document.getElementById("alunoTurmaDropdown");

    alunoSelect.addEventListener("change", function () {
        const alunoId = this.value;

        carregarTurmasAlunoDropdown("turmaDropdown", alunoId);
    });

});

function getNomeDisciplina(id){
    const disciplinas = JSON.parse(localStorage.getItem("disciplinas")) || [];
    const disciplina = disciplinas.find(d => d.id == id);
    return disciplina ? disciplina.nomed: "Nenhuma disciplina encontrada"

}

// Só executa se a página tiver a tabela de alunos
if (document.getElementById("tabela-alunos-body")) {
    renderizarTabela();
}