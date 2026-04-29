const turmas = JSON.parse(localStorage.getItem("turmas")) || [];
const professores = JSON.parse(localStorage.getItem("professores")) || [];
const disciplinas = JSON.parse(localStorage.getItem("disciplinas")) || [];

let modoEdicao = false;
let turmaSelecionadaId = null;

function salvarTurma() {

    if (modoEdicao) {
        const turma = turmas.find(t => t.id === turmaSelecionadaId);

        if (turma) {

        }

        modoEdicao = false;

    } else {
        const turma = {
            id: Date.now(),
            professorId: document.getElementById("professorTDropdown").value,
            disciplinaId: document.getElementById("disciplinaTDropdown").value,
            nomet: "T - ",
            salat: document.getElementById("salat").value,
            nvagast: document.getElementById("nvagast").value,
            horariot: document.getElementById("horariot").value  
        }

        turmas.push(turma);

        
    }
    localStorage.setItem("turmas", JSON.stringify(turmas));
    renderizarTabela();
    fecharModal();
    limparFormulario();
}


document.addEventListener("click", function(e) {
    if (e.target && e.target.id === "btnSalvarTurma"){
        salvarTurma();
    }
});

function renderizarTabela() {
    const tbody = document.getElementById("tabela-turmas-body");
    tbody.innerHTML = "";
        turmas.forEach(turma => {
        tbody.innerHTML += `
            <tr>
                <td>${turma.id}</td>
                <td>${turma.nomet}</td>
                <td>${turma.disciplinaId}</td>
                <td>${turma.professorId}</td>
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

function limparFormulario() {
    document.getElementById("nomet").value = "";
    document.getElementById("professorTDropdown").value = "";
    document.getElementById("disciplinaTDropdown").value = "";
    document.getElementById("turnoTDropdown").value = "";
    document.getElementById("nvagast").value = "";
    document.getElementById("salat").value = "";
}

function fecharModal() {
    document.getElementById("modal-turma").style.display = "none";
    modoEdicao = false;
    document.getElementById("btnSalvarDisciplina").textContent = "Cadastrar"; 
}

renderizarTabela();