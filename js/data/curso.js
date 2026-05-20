const API = "http://localhost:8080/cursos";
const API_DEP = "http://localhost:8080/departamentos";

let modoEdicao = false;
let cursoSelecionadoId = null;


async function salvarCurso(){

        const curso = {
            nome: document.getElementById("nomec").value,
            departamentoId: document.getElementById("departamentoModalDropdown").value,
            cargaHoraria: document.getElementById("cargaHorariac").value,
            turno: document.getElementById("turnoDropdown").value,
            periodos: document.getElementById("periodosc").value,
            status: "ATIVO"
        }

    if (modoEdicao) {

        await fetch(`${API}/${cursoSelecionadoId}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(curso)
        });
        modoEdicao = false;


    } else {

        await fetch(API, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(curso)
        });
    }
    
    renderizarTabela();
    fecharModal();
    limparFormulario();
    
}

async function renderizarTabela() {
    const response = await fetch(API);

    const cursos = await response.json();

    const tbody = document.getElementById("tabela-cursos-body");
    tbody.innerHTML = "";

    cursos.forEach(curso => {
        tbody.innerHTML += `
            <tr>
                <td>${curso.id}</td>
                <td>${curso.nome}</td>
                <td>${curso.departamento.nome}</td>
                <td>${curso.turno}</td>
                <td>${curso.cargaHoraria}</td>
                <td>
                    <button onclick="editarCurso(${curso.id})" class="btn-editar" data-id="${curso.id}">Editar</button>
                    <button onclick="visualizarCurso(${curso.id})" class="btn-visualizar" data-id="${curso.id}">Visualizar</button>
                </td>
            </tr>
        `;
    });
}


document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "btnSalvarCurso") {
        salvarCurso();
    }
});


function limparFormulario() {
    document.getElementById("nomec").value = "";
    document.getElementById("departamentoModalDropdown").value = "";
    document.getElementById("cargaHorariac").value = "";
    document.getElementById("turnoDropdown").value = "";
    document.getElementById("periodosc").value = "";
}

function fecharModal() {
    document.getElementById("modal-curso").style.display = "none";
    //resta estado de edicao
    modoEdicao = false;
    document.getElementById("btnSalvarCurso").textContent = "Cadastrar"; //deixa o botao como estava antes
}


//excluir curso dentro do modal de visualizar curso
document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "btnExcluirModal") {
        excluirCurso(cursoSelecionadoId);
    }
});

//editar curso dentro do modal de visualizar curso
document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "btnEditarModal") {
        editarCurso(cursoSelecionadoId);
    }   
});

async function editarCurso(id) {
    const response = await fetch(`${API}/${id}`);

    const curso = await response.json();
    if (!curso) return;

    cursoSelecionadoId = id;


    document.getElementById("nomec").value = curso.nome;
    document.getElementById("departamentoModalDropdown").value = curso.departamento.nome;
    document.getElementById("cargaHorariac").value = curso.cargaHoraria;
    document.getElementById("turnoDropdown").value = curso.turno;
    document.getElementById("periodosc").value = curso.periodos;

    modoEdicao = true;

    document.getElementById("btnSalvarCurso").textContent = "Salvar";
    document.getElementById("modal-curso").style.display = "flex";

    
}

async function excluirCurso(id) {

    await fetch(`${API}/${cursoSelecionadoId}`, {
        method: "DELETE"
    })

    document.getElementById("modal-visualizar-curso").style.display = "none";

    renderizarTabela();

}

async function carregarDepartamentosDropdown(selectId) {

    const response = await fetch(API_DEP);
    const departamentos = await response.json();

    const select = document.getElementById(selectId);

    select.innerHTML = `
        <option value="">Selecione um departamento</option>
    `;

    departamentos.forEach(dep => {

        select.innerHTML += `
            <option value="${dep.id}">
                ${dep.nome}
            </option>
        `;
    });
}

async function visualizarCurso(id) {
    const response = await fetch(`${API}/${id}`);
    const curso = await response.json();
    if (!curso) return;

    const modal = document.getElementById("modal-visualizar-curso");

    cursoSelecionadoId = id;

    document.getElementById("visualizarNomeCurso").textContent = curso.nome;
    document.getElementById("visualizarDepartamentoCurso").textContent = curso.departamento.nome;
    document.getElementById("visualizarCargaHorariaCurso").textContent = curso.cargaHoraria;
    document.getElementById("visualizarTurnoCurso").textContent = curso.turno;
    document.getElementById("visualizarPeriodosCurso").textContent = curso.periodos;

    const tbodyDisciplinas = document.getElementById("tabela-disciplinas-curso");
    tbodyDisciplinas.innerHTML = "";

    curso.disciplinas.forEach(d => {
        tbodyDisciplinas.innerHTML += `
            <tr>
                <td>${d.id}</td>
                <td>${d.nome}</td>
                <td>-- </td> <!-- professor -->
                <td>${d.periodo}</td>
                <td>${d.cargaHoraria}</td>
            </tr>
        `;
    });

    modal.style.display = "flex";
}



renderizarTabela();