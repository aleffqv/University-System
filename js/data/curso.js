const departamentos = JSON.parse(localStorage.getItem("departamentos")) || [];
const cursos = JSON.parse(localStorage.getItem("cursos")) || [];

let modoEdicao = false;
let cursoSelecionadoId = null;


function salvarCurso(){
    if (modoEdicao) {
        const curso = cursos.find(c => c.id === cursoSelecionadoId);

        if (curso) {
            curso.nomec = document.getElementById("nomec").value;
            curso.departamentoId = document.getElementById("departamentoModalDropdown").value;
            curso.cargaHorariac = document.getElementById("cargaHorariac").value;
            curso.turno = document.getElementById("turnoDropdown").value;
            curso.periodos = document.getElementById("periodosc").value;
        }
        modoEdicao = false;


    } else {
        const curso = {
            id: Date.now(),
            nomec: document.getElementById("nomec").value,
            departamentoId: document.getElementById("departamentoModalDropdown").value,
            cargaHorariac: document.getElementById("cargaHorariac").value,
            turno: document.getElementById("turnoDropdown").value,
            periodos: document.getElementById("periodosc").value
        }
        

        cursos.push(curso);
    }
    localStorage.setItem("cursos", JSON.stringify(cursos));

    renderizarTabela();
    fecharModal();
    limparFormulario();
    
}

function renderizarTabela() {
    
    const tbody = document.getElementById("tabela-cursos-body");
    tbody.innerHTML = "";

    cursos.forEach(curso => {
        tbody.innerHTML += `
            <tr>
                <td>${curso.id}</td>
                <td>${curso.nomec}</td>
                <td>${getNomeDepartamento(curso.departamentoId)}</td>
                <td>${curso.turno}</td>
                <td>${curso.cargaHorariac}</td>
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

function editarCurso(id) {
    cursoSelecionadoId = id;
    const curso = cursos.find(c => c.id === id);
    if (!curso) return;

    document.getElementById("nomec").value = curso.nomec;
    document.getElementById("departamentoModalDropdown").value = curso.departamentoId;
    document.getElementById("cargaHorariac").value = curso.cargaHorariac;
    document.getElementById("turnoDropdown").value = curso.turno;
    document.getElementById("periodosc").value = curso.periodos;

    modoEdicao = true;

    document.getElementById("btnSalvarCurso").textContent = "Salvar";
    document.getElementById("modal-curso").style.display = "flex";

    
}

function excluirCurso(id) {
    const index = cursos.findIndex(curso => curso.id === id);
    if (index === -1) return;

    cursos.splice(index, 1);

    localStorage.setItem("cursos", JSON.stringify(cursos));
    document.getElementById("modal-visualizar-curso").style.display = "none";

    renderizarTabela();

}

function carregarDepartamentosDropdown(selectId) {
    const select = document.getElementById(selectId);

    // limpa antes de preencher
    select.innerHTML = '<option value="">Selecione um departamento</option>';

    departamentos.forEach(dep => {
        select.innerHTML += `
            <option value="${dep.id}">
                ${dep.nome}
            </option>
        `;
    });
}

function getNomeDepartamento(id) {
    const departamentos = JSON.parse(localStorage.getItem("departamentos")) || [];
    const dep = departamentos.find(d => d.id == id);
    return dep ? dep.nome : "Departamento não encontrado";
}

renderizarTabela();