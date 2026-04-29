const disciplinas = JSON.parse(localStorage.getItem("disciplinas")) || [];
const cursos = JSON.parse(localStorage.getItem("cursos")) || [];

let modoEdicao = false;
let disciplinaSelecionadaId = null;

function salvarDisciplina(){
    if (modoEdicao) {
        const disciplina = disciplinas.find(d => d.id === disciplinaSelecionadaId);
        if (disciplina) {
            disciplina.nomed = document.getElementById("nomed").value;
            disciplina.cargahorariad = document.getElementById("cargahorariad").value;
            disciplina.cursoId = document.getElementById("cursoModalDropdown").value;
            disciplina.periodod = document.getElementById("periodod").value;
        }

        modoEdicao = false;
    } else {
        const disciplina = {
            id: Date.now(),
            nomed: document.getElementById("nomed").value,
            cargahorariad: document.getElementById("cargahorariad").value,
            cursoId: document.getElementById("cursoModalDropdown").value,
            periodod: document.getElementById("periodod").value
        };

        disciplinas.push(disciplina);
    }

    localStorage.setItem("disciplinas", JSON.stringify(disciplinas));
    renderizarTabela();
    fecharModal();
    limparFormulario();
}

document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "btnSalvarDisciplina"){
        salvarDisciplina();
    }
});


function renderizarTabela() {
    
    const tbody = document.getElementById("tabela-disciplinas-body");
    tbody.innerHTML = "";

    disciplinas.forEach(disciplina => {
        tbody.innerHTML += `
            <tr>
                <td>${disciplina.id}</td>
                <td>${disciplina.nomed}</td>
                <td>${getNomeCurso(disciplina.cursoId)}</td>
                <td>${disciplina.cargaHorariad}</td>
                <td>${disciplina.periodod}</td>
                <td>
                    <button onclick="editarDisciplina(${disciplina.id})" class="btn-editar" data-id="${disciplina.id}">Editar</button>
                    <button onclick="visualizarDisciplina(${disciplina.id})" class="btn-visualizar" data-id="${disciplina.id}">Visualizar</button>
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

function carregarCursoDropdown(selectId) {
    const select = document.getElementById(selectId);

    // limpa antes de preencher
    select.innerHTML = '<option value="">Selecione um curso</option>';

    cursos.forEach(curso => {
        select.innerHTML += `
            <option value="${curso.id}">
                ${curso.nomec}
            </option>
        `;
    });
}

function editarDisciplina(id) {
    disciplinaSelecionadaId = id;
    const disciplina = disciplinas.find(d => d.id == id);
    if (!disciplina) return;
    document.getElementById("nomed").value = disciplina.nomed;
    document.getElementById("cargahorariad").value = disciplina.cargaHorariad;
    document.getElementById("cursoModalDropdown").value = disciplina.cursoId;
    document.getElementById("periodod").value = disciplina.periodod;

    modoEdicao = true;
    document.getElementById("btnSalvarDisciplina")
    //document.getElementById("modal-visualizar-disciplina").style.display = "none";
    document.getElementById("modal-disciplina").style.display = "flex";
}

function visualizarDisciplina(id){
    
    
    const disciplina = disciplinas.find(d => d.id === id);
    if (!disciplina) return;

    const modal = document.getElementById("modal-visualizar-disciplina");

    disciplinaSelecionadaId = id;
    console.log("txt id disciplina: " + disciplinaSelecionadaId);

    document.getElementById("visualizarNomeDisciplina").textContent = disciplina.nomed;
    //docume
    document.getElementById("visualizarCargaHorariaDisciplina").textContent = disciplina.cargaHorariad;
    document.getElementById("visualizarCursoDisciplina").textContent = getNomeCurso(disciplina.cursoId);
    document.getElementById("visualizarPeriodosDisciplina").textContent = disciplina.periodod;

    modal.style.display = "flex";
}


function getNomeCurso(id){
    const cursos = JSON.parse(localStorage.getItem("cursos")) || [];
    const curso = cursos.find(c => c.id == id);
    return curso ? curso.nomec: "Nenhum curso encontrado"

}

renderizarTabela();