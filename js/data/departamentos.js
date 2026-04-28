const departamentos = JSON.parse(localStorage.getItem("departamentos")) || [];

let modoEdicao = false;
let departamentoSelecionadoId = null;

function salvarDepartamento(){

    if (modoEdicao) {
        const departamento = departamentos.find(dep => dep.id === departamentoSelecionadoId);

        if (departamento) {
            departamento.nome = document.getElementById("nomeDep").value;
        }

        modoEdicao = false;
        document.getElementById("btnSalvarDep").textContent = "Cadastrar";
    } else {
        const departamento = {
        id: Date.now(),
        nome: document.getElementById("nomeDep").value,
        };
        departamentos.push(departamento);

    }
  

    localStorage.setItem("departamentos", JSON.stringify(departamentos));

    renderizarTabela();

    fecharModal();

    limparFormulario();
}

function renderizarTabela() {
    const tbody = document.getElementById("tabela-dep-body");
    tbody.innerHTML = "";
                   
    departamentos.forEach(departamento => {
        tbody.innerHTML += `
            <tr>   
                <td>${departamento.id}</td>
                <td>${departamento.nome}</td>
                <td>
                    <button onclick="editarDepartamento(${departamento.id})" class="btn-editar" data-id="${departamento.id}">Editar</button>
                    <button onclick="visualizarDepartamento(${departamento.id})" class="btn-visualizar" data-id="${departamento.id}">Visualizar</button>
                </td>
            </tr>  
        `;
    });
}

function limparFormulario() {
    document.getElementById("nomeDep").value = "";
}

function fecharModal() {
    document.getElementById("modal-departamento").style.display = "none";
}

document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "btnSalvarDep") {
        salvarDepartamento();
    }
});


function editarDepartamento(id) {
    departamentoSelecionadoId = id;
    const departamento = departamentos.find(dep => dep.id === departamentoSelecionadoId);
    if (departamento) {
        document.getElementById("nomeDep").value = departamento.nome;
        document.getElementById("btnSalvarDep").textContent = "Salvar";

        modoEdicao = true;
        document.getElementById("btnSalvarDep").textContent = "Salvar";
        document.getElementById("modal-departamento").style.display = "flex";

        document.getElementById("modal-visualizar-dep").style.display = "none";
    }

}

//mostrar dep e cursos associados
function visualizarDepartamento(id) {
    //carrega os dados de dep e curso
    const departamentos = JSON.parse(localStorage.getItem("departamentos")) || [];
    const cursos = JSON.parse(localStorage.getItem("cursos")) || [];

    //seleciona um departamento especifico
    const departamento = departamentos.find(dep => dep.id == id);
    if (!departamento) return;

    //carrega o modal de visualizar departamento
    const modal = document.getElementById("modal-visualizar-dep");

    //associa o id de dep a uma variavel global
    departamentoSelecionadoId = id;

    //coloca o nome do departamento no modal (id visualizarNomeDep)
    document.getElementById("visualizarNomeDep").textContent = departamento.nome;

    //filtra o curso pelo id do departamento que foi selecionado
    const cursosDoDepartamento = cursos.filter(curso => curso.departamentoId == id);

    //carrega a tabela de cursos do departamento dentro do modal
    const tbody = document.getElementById("tabela-cursos-dep-body");
    tbody.innerHTML = "";

    //constroi a tabela de cursos do departamento
    cursosDoDepartamento.forEach(curso => {
        tbody.innerHTML += `
            <tr>
                <td>${curso.id}</td>
                <td>${curso.nomec}</td>
                <td>${curso.turno}</td>
                <td>${curso.periodos}</td>
                <td>${curso.cargaHorariac}</td>
            </tr>
        `;
    });

    // abre modal
    modal.style.display = "flex";
}


function excluirDepartamento(id) {
    const index = departamentos.findIndex(dep => dep.id === id);
    if (index === -1) return;

    departamentos.splice(index, 1);

    localStorage.setItem("departamentos", JSON.stringify(departamentos));
    document.getElementById("modal-visualizar-dep").style.display = "none";

    renderizarTabela();

}

//excluir departamento dentro do modal de visualizar departamento
document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "btnExcluirModal") {
        excluirDepartamento(departamentoSelecionadoId);
    }
});

//editar departamento dentro do modal de visualizar departamento
document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "btnEditarModal") {
        editarDepartamento(departamentoSelecionadoId);
    }   
});

renderizarTabela();