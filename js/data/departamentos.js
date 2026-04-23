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
    }
}

function visualizarDepartamento(id) {
    const departamento = departamentos.find(dep => dep.id === id);
    if (!departamento) return;

    const modal = document.getElementById("modal-visualizar-dep");

    departamentoSelecionadoId = id; 

    document.getElementById("nomeDepView").textContent = departamento.nome; 
    modal.style.display = "flex";
}


function excluirDepartamento(id) {
    const index = departamentos.findIndex(dep => dep.id === id);
    if (index === -1) return;

    departamentos.splice(index, 1);
}

renderizarTabela();