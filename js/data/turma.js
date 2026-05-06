const turmas = JSON.parse(localStorage.getItem("turmas")) || [];
const professores = JSON.parse(localStorage.getItem("professores")) || [];
const disciplinas = JSON.parse(localStorage.getItem("disciplinas")) || [];
const cursos = JSON.parse(localStorage.getItem("cursos")) || [];

let modoEdicaoTurma = false;
let turmaSelecionadaId = null;

let cursoSelecionadoId = null;

function salvarTurma() {

    if (modoEdicaoTurma) {
        const turma = turmas.find(t => t.id === turmaSelecionadaId);

        if (turma) {
            turma.professorId = document.getElementById("professorTDropdown").value;
            turma.disciplinaId = document.getElementById("disciplinaTDropdown").value;
            turma.cursoId = document.getElementById("cursoTDropdown").value;
            turma.salat = document.getElementById("salat").value;
            turma.nvagast = document.getElementById("nvagast").value;
            turma.horariot = document.getElementById("horariot").value; 
        }

        modoEdicaoTurma = false;
        document.getElementById("btnSalvarTurma").textContent = "Cadastrar";

    } else {
        const turma = {
            id: Date.now(),
            cursoId: document.getElementById("cursoTDropdown").value,
            professorId: document.getElementById("professorTDropdown").value,
            disciplinaId: document.getElementById("disciplinaTDropdown").value,
            nomet: "T ",
            salat: document.getElementById("salat").value,
            nvagast: document.getElementById("nvagast").value,
            horariot: document.getElementById("horariot").value  
        }

        turmas.push(turma);

        
    }
    localStorage.setItem("turmas", JSON.stringify(turmas));
    renderizarTabelaTurmas();
    fecharModal();
    limparFormulario();
}


document.addEventListener("click", function(e) {
    if (e.target && e.target.id === "btnSalvarTurma"){
        salvarTurma();
    }
});

function renderizarTabelaTurmas() {
    const tbody = document.getElementById("tabela-turmas-body");
    if (!tbody) return;
    tbody.innerHTML = "";
        turmas.forEach(turma => {
        tbody.innerHTML += `
            <tr>
                <td>${turma.id}</td>
                <td>${turma.nomet} </td>
                <td>${getNomeDisciplina(turma.disciplinaId)}</td>
                <td>${getNomeCurso(turma.cursoId)}</td>
                <td>${getNomeProfessor(turma.professorId)}</td>
                <td>${turma.salat}</td>
                <td>${turma.horariot}</td>
                <td>${turma.nvagast}</td>
                <td>
                    <button onclick="editarTurma(${turma.id})" class="btn-editar" data-id="${turma.id}">Editar</button>
                    <button onclick="visualizarTurma(${turma.id})" class="btn-visualizar" data-id="${turma.id}">Visualizar</button>
                </td>
            </tr>
        `;
    });
}

function visualizarTurma(id) {
    const alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    const turma = turmas.find(t => t.id === id);
    if (!turma) return;

    const modal = document.getElementById("modal-visualizar-turma");

    turmaSelecionadaId = id;

    document.getElementById("visualizarNomeTurma").textContent = turma.nomet;
    document.getElementById("visualizarCursoTurma").textContent = getNomeCurso(turma.cursoId);
    document.getElementById("visualizarProfessorTurma").textContent = getNomeProfessor(turma.professorId);
    document.getElementById("visualizarSalaTurma").textContent = turma.salat;
    document.getElementById("visualizarHorarioTurma").textContent = turma.horariot;
    document.getElementById("visualizarVagasTurma").textContent = turma.nvagast;


    const matriculas = JSON.parse(localStorage.getItem("matriculas")) || [];
    const matriculasTurma = matriculas.filter(m => m.turmaId == turmaSelecionadaId);

    const alunosTurma = matriculasTurma.map(m => alunos.find(a => a.id == m.alunoId)).filter( a => a != null);


    

    const tbodyAlunos = document.getElementById("tabela-alunos-turmas");
    tbodyAlunos.innerHTML = "";

    alunosTurma.forEach(aluno => {
        tbodyAlunos.innerHTML += `
        <tr>
                <td>${aluno.id}</td>
                <td>${aluno.nome}</td>
                <td>${getNomeCurso(aluno.cursoId)}</td>
                <td>${aluno.genero}</td>
                <td>${aluno.status}</td>
                <td>
                    <button onclick="editarAluno(${aluno.id})" class="btn-editar" data-id="${aluno.id}">Editar</button>
                    <button onclick="visualizarAluno(${aluno.id})" class="btn-visualizar" data-id="${aluno.id}">Visualizar</button>
                </td>
            </tr>
        `;        
    })

    modal.style.display = "flex";

}

function editarTurma(id) {
    turmaSelecionadaId = id;
    const turma = turmas.find(t => t.id == turmaSelecionadaId);
    
    if (!turma) return;

    document.getElementById("professorTDropdown").value = turma.professorId;
    document.getElementById("disciplinaTDropdown").value = turma.disciplinaId;
    document.getElementById("cursoTDropdown").value = turma.cursoId;
    document.getElementById("salat").value = turma.salat;
    document.getElementById("nvagast").value = turma.nvagast;
    document.getElementById("horariot").value = turma.horariot;

    modoEdicaoTurma = true;
    document.getElementById("btnSalvarTurma").textContent = "Salvar";

    //OBSSS 
    document.getElementById("modal-visualizar-turma").style.display = "none";

    document.getElementById("modal-turma").style.display = "flex";

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
    document.getElementById("btnSalvarDisciplina").textContent = "Cadastrar"; 
}

function carregarCursosDropdown(selectId) {
    const select = document.getElementById(selectId);

    // limpa antes de preencher
    select.innerHTML = '<option value="">Selecione um curso</option>';
    

    cursos.forEach(c => {
        select.innerHTML += `
            <option value="${c.id}">
                ${c.nomec}
            </option>
        `;
    });

    
}

//carregar disciplinas de um curso especifico dropdown, linkar utilizando o id do curso
function carregarDisciplinasDropdown(selectId, cursoId) {
    const select = document.getElementById(selectId);
    
    if (!cursoId) {
        select.innerHTML = '<option value="">Selecione um curso primeiro</option>';
        return;
    }

    const disciplinasFilter = disciplinas.filter(df => df.cursoId == cursoId);

    select.innerHTML = '<option value="">Selecione uma disciplina</option>';

    disciplinasFilter.forEach(df => {
        select.innerHTML += `
            <option value="${df.id}">
                ${df.nomed}
            </option>
        `;
    });
}

function carregarProfessoresDropdown(selectId, cursoId){
    const select = document.getElementById(selectId);
    const cursoDep = cursos.find(c => c.id == cursoId)?.departamentoId;

    
    const professoresFilter = professores.filter(p => p.departamentoId == cursoDep);

    select.innerHTML = '<option value="">Selecione um professor</option>';

    professoresFilter.forEach(p => {
        select.innerHTML += `
            <option value="${p.id}">
                ${p.nomep}
            </option>
        `;
    });

}


function getNomeCurso(id){
    const cursos = JSON.parse(localStorage.getItem("cursos")) || [];
    const curso = cursos.find(c => c.id == id);
    return curso ? curso.nomec: "Nenhum curso encontrado"

}

function getNomeDisciplina(id){
    const disciplinas = JSON.parse(localStorage.getItem("disciplinas")) || [];
    const disciplina = disciplinas.find(d => d.id == id);
    return disciplina ? disciplina.nomed: "Nenhuma disciplina encontrada"

}

function getNomeProfessor(id){
    const professores = JSON.parse(localStorage.getItem("professores")) || [];
    const professor = professores.find(p => p.id == id);
    return professor ? professor.nomep: "Nenhum professor encontrado"

}

renderizarTabelaTurmas();