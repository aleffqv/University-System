const API = "http://localhost:8080/disciplinas";
const API_CURSOS = "http://localhost:8080/cursos";

let modoEdicao = false;
let disciplinaSelecionadaId = null;

async function salvarDisciplina(){

    const disciplina = {
            nome: document.getElementById("nomed").value,
            cargaHoraria: document.getElementById("cargahorariad").value,
            cursoId: document.getElementById("cursoModalDropdown").value,
            periodo: document.getElementById("periodod").value
        };

    if (modoEdicao) {
        
            await fetch(`${API}/${disciplinaSelecionadaId}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(disciplina)
        });   

        modoEdicao = false;

    } else {
        await fetch(API, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(disciplina)
        });

    }

    renderizarTabela();
    fecharModal();
    limparFormulario();
}

document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "btnSalvarDisciplina"){
        salvarDisciplina();
    }
});


async function renderizarTabela() {
    const response = await fetch(API);

    const disciplinas = await response.json();
    
    const tbody = document.getElementById("tabela-disciplinas-body");
    tbody.innerHTML = "";

    disciplinas.forEach(disciplina => {
        tbody.innerHTML += `
            <tr>
                <td>${disciplina.id}</td>
                <td>${disciplina.nome}</td>
                <td>${disciplina.curso.nome}</td>
                <td>${disciplina.cargaHoraria}</td>
                <td>${disciplina.periodo}</td>
                <td>
                    <button onclick="editarDisciplina(${disciplina.id})" class="btn-icone btn-editar" title="Editar"></button>
                    <button onclick="visualizarDisciplina(${disciplina.id})" class="btn-icone btn-visualizar" title="Visualizar"></button>
                </td>
            </tr>
        `;
    });
}

function limparFormulario(){
    document.getElementById("nomed").value = "";
    document.getElementById("cargahorariad").value = "";
    document.getElementById("CursoModalDropdown").value = "";
    document.getElementById("turnoDropdown").value = "";
    document.getElementById("periodod").value = "";
}

function fecharModal() {
    document.getElementById("modal-disciplina").style.display = "none";
    modoEdicao = false;
    document.getElementById("btnSalvarDisciplina").textContent = "Cadastrar"; 
}

async function carregarCursoDropdown(selectId) {

    const response = await fetch(API_CURSOS);
    const cursos = await response.json();

    const select = document.getElementById(selectId);

    // limpa antes de preencher
    select.innerHTML = '<option value="">Selecione um curso</option>';

    cursos.forEach(curso => {
        select.innerHTML += `
            <option value="${curso.id}">
                ${curso.nome}
            </option>
        `;
    });
}

async function editarDisciplina(id) {
    
    const response = await fetch(`${API}/${id}`);

    const disciplina = await response.json();
    if (!disciplina) return;

    disciplinaSelecionadaId = id;

    document.getElementById("nomed").value = disciplina.nome;
    document.getElementById("cargahorariad").value = disciplina.cargaHoraria;
    document.getElementById("cursoModalDropdown").value = disciplina.curso.nome;
    document.getElementById("periodod").value = disciplina.periodo;

    modoEdicao = true;
    document.getElementById("btnSalvarDisciplina")
    //document.getElementById("modal-visualizar-disciplina").style.display = "none";
    document.getElementById("modal-disciplina").style.display = "flex";
}

async function visualizarDisciplina(id){
    
    
    const response = await fetch(`${API}/${id}`);

    const disciplina = await response.json();
    if (!disciplina) return;

    const modal = document.getElementById("modal-visualizar-disciplina");

    disciplinaSelecionadaId = id;

    document.getElementById("visualizarNomeDisciplina").textContent = disciplina.nome;
    document.getElementById("visualizarCargaHorariaDisciplina").textContent = disciplina.cargaHoraria;
    document.getElementById("visualizarCursoDisciplina").textContent = disciplina.curso.nome;
    document.getElementById("visualizarPeriodosDisciplina").textContent = disciplina.periodo;

    const tbody = document.getElementById("tabela-turmas-disciplinas");
    if(!tbody) return;
    tbody.innerHTML = "";

    disciplina.turmas.forEach(turma => {
        tbody.innerHTML += `
            <tr>
                <td>${turma.id}</td>
                <td>${turma.nome}</td>
                <td>${turma.professor.pessoa.nome}</td>
                <td>${turma.sala}</td>
                <td>${turma.horario}</td>
            </tr>
        `;
    });

    modal.style.display = "flex";
}

async function excluirDisciplina(id) {

    await fetch(`${API}/${disciplinaSelecionadaId}`, {
        method: "DELETE"
    });

    document.getElementById("modal-visualizar-disciplina").style.display = "none";

    renderizarTabela();
    
}


function getNomeCurso(id){
    const cursos = JSON.parse(localStorage.getItem("cursos")) || [];
    const curso = cursos.find(c => c.id == id);
    return curso ? curso.nomec: "Nenhum curso encontrado"

}

renderizarTabela();