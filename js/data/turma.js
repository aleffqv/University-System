const API = "http://localhost:8080/turmas";
const API_DISCIPLINAS = "http://localhost:8080/disciplinas";
const API_PROFESSORES = "http://localhost:8080/professores";
const API_CURSOS = "http://localhost:8080/cursos";

let modoEdicaoTurma = false;
let turmaSelecionadaId = null;

async function salvarTurma() {

    const turma = {
        nome: "Turma -" + new Date().getFullYear(),
        disciplinaId:document.getElementById("disciplinaTDropdown").value,
        professorId:document.getElementById("professorTDropdown").value,
        sala:document.getElementById("salat").value,
        horario:document.getElementById("horariot").value,
        nvagas:document.getElementById("nvagast").value
    };

    if (modoEdicaoTurma) {

        await fetch(`${API}/${turmaSelecionadaId}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(turma)
        });

        modoEdicaoTurma = false;

    } else {

        await fetch(API, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(turma)
        });
    }

    renderizarTabelaTurmas();

    fecharModal();

    limparFormulario();
}


document.addEventListener("click", function(e) {
    if (e.target && e.target.id === "btnSalvarTurma"){
        salvarTurma();
    }
});

async function renderizarTabelaTurmas() {

    const response = await fetch(API);

    const turmas = await response.json();

    const tbody = document.getElementById("tabela-turmas-body");

    tbody.innerHTML = "";

    turmas.forEach(turma => {

        tbody.innerHTML += `
            <tr>
                <td>${turma.id}</td>
                <td>${turma.nome}</td>
                <td>${turma.disciplina.nome}</td>
                <td>${turma.disciplina.curso.nome}</td>
                <td>${turma.professor.pessoa.nome}</td>
                <td>${turma.sala}</td>
                <td>${turma.horario}</td>
                <td>${turma.nvagas}</td>

                <td>
                    <button onclick="editarTurma(${turma.id})"
                        class="btn-editar">
                        Editar
                    </button>

                    <button onclick="visualizarTurma(${turma.id})"
                        class="btn-visualizar">
                        Visualizar
                    </button>
                </td>
            </tr>
        `;
    });
}

async function visualizarTurma(id) {

    const response = await fetch(`${API}/${id}`);

    const turma = await response.json();

    if (!turma) return;

    turmaSelecionadaId = id;

    document.getElementById("visualizarNomeTurma").textContent =
        turma.nome;

    document.getElementById("visualizarCursoTurma").textContent =
        turma.disciplina.curso.nome;

    document.getElementById("visualizarProfessorTurma").textContent =
        turma.professor.pessoa.nome;

    document.getElementById("visualizarSalaTurma").textContent =
        turma.sala;

    document.getElementById("visualizarHorarioTurma").textContent =
        turma.horario;

    document.getElementById("visualizarVagasTurma").textContent =
        turma.numeroVagas;

    const tbodyAlunos =
        document.getElementById("tabela-alunos-turmas");

    tbodyAlunos.innerHTML = "";

    turma.matriculas.forEach(matricula => {

        const aluno = matricula.aluno;

        tbodyAlunos.innerHTML += `
            <tr>
                <td>${aluno.id}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.curso.nome}</td>
                <td>${aluno.genero}</td>
                <td>${aluno.status}</td>
            </tr>
        `;
    });

    document.getElementById(
        "modal-visualizar-turma"
    ).style.display = "flex";
}

async function editarTurma(id) {

    const response = await fetch(`${API}/${id}`);

    const turma = await response.json();

    if (!turma) return;

    turmaSelecionadaId = id;

    document.getElementById("disciplinaTDropdown").value =
        turma.disciplina.id;

    document.getElementById("professorTDropdown").value =
        turma.professor.id;

    document.getElementById("salat").value =
        turma.sala;

    document.getElementById("nvagast").value =
        turma.numeroVagas;

    document.getElementById("horariot").value =
        turma.horario;

    modoEdicaoTurma = true;

    document.getElementById("btnSalvarTurma").textContent =
        "Salvar";

    document.getElementById(
        "modal-visualizar-turma"
    ).style.display = "none";

    document.getElementById(
        "modal-turma"
    ).style.display = "flex";
}



function limparFormulario() {
    document.getElementById("nomet").value = "";
    document.getElementById("professorTDropdown").value = "";
    document.getElementById("disciplinaTDropdown").value = "";
    document.getElementById("turnoTDropdown").value = "";
    document.getElementById("nvagast").value = "";
    document.getElementById("salat").value = "";
    document.getElementById("cursoTDropdown").selectedIndex = 0;

    document.getElementById("disciplinaTDropdown").innerHTML =
        '<option value="">Selecione um curso primeiro</option>';

    document.getElementById("professorTDropdown").innerHTML =
        '<option value="">Selecione um curso primeiro</option>';
}

function fecharModal() {
    document.getElementById("modal-turma").style.display = "none";
    modoEdicaoTurma = false;
    document.getElementById("btnSalvarTurma").textContent = "Cadastrar"; 
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

async function carregarDisciplinasDropdown(selectId) {

    const response = await fetch(API_DISCIPLINAS);

    const disciplinas = await response.json();

    const select = document.getElementById(selectId);

    select.innerHTML =
        '<option value="">Selecione uma disciplina</option>';

    disciplinas.forEach(disciplina => {

        select.innerHTML += `
            <option value="${disciplina.id}">
                ${disciplina.nome}
            </option>
        `;
    });
}

async function carregarProfessoresDropdown(selectId) {

    const response = await fetch(API_PROFESSORES);

    const professores = await response.json();

    const select = document.getElementById(selectId);

    select.innerHTML =
        '<option value="">Selecione um professor</option>';

    professores.forEach(professor => {

        select.innerHTML += `
            <option value="${professor.id}">
                ${professor.pessoa.nome}
            </option>
        `;
    });
}

async function excluirTurma() {

    await fetch(`${API}/${turmaSelecionadaId}`, {

        method: "DELETE"
    });

    document.getElementById(
        "modal-visualizar-turma"
    ).style.display = "none";

    renderizarTabelaTurmas();
}

renderizarTabelaTurmas();