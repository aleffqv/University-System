const API = "http://localhost:8080/departamentos";


let modoEdicaoDep = false;
let departamentoSelecionadoId = null;

async function salvarDepartamento(){

    const departamento = {
        nome: document.getElementById("nomeDep").value
    };


    if (modoEdicaoDep) {
        //const departamento = departamentos.find(dep => dep.id === departamentoSelecionadoId);

        await fetch(`${API}/${departamentoSelecionadoId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(departamento)
        });

        modoEdicaoDep = false;
        document.getElementById("btnSalvarDep").textContent = "Cadastrar";
    } else {
        
        await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(departamento)
        });
            
    }
  

    renderizarTabela();

    fecharModal();

    limparFormulario();
}



async function renderizarTabela() {

    const response = await fetch(API);
    const departamentos = await response.json();

    const tbody = document.getElementById("tabela-dep-body");

    tbody.innerHTML = "";
                   
    departamentos.forEach(departamento => {
        tbody.innerHTML += `
            <tr>   
                <td>${departamento.id}</td>
                <td>${departamento.nome}</td>
                <td>
                    <button onclick="editarDepartamento(${departamento.id})" class="btn-icone btn-editar" title="Editar"></button>
                    <button onclick="visualizarDepartamento(${departamento.id})" class="btn-icone btn-visualizar" title="Visualizar"></button>
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


async function editarDepartamento(id) {

    const response = await fetch(`${API}/${id}`);
    const departamento = await response.json();

    departamentoSelecionadoId = id;
    //const departamento = departamentos.find(dep => dep.id === departamentoSelecionadoId);
    if (departamento) {
        document.getElementById("nomeDep").value = departamento.nome;
        document.getElementById("btnSalvarDep").textContent = "Salvar";

        modoEdicaoDep = true;
        document.getElementById("btnSalvarDep").textContent = "Salvar";
        document.getElementById("modal-departamento").style.display = "flex";

        document.getElementById("modal-visualizar-dep").style.display = "none";
    }

}

//mostrar dep e cursos associados
async function visualizarDepartamento(id) {
    
    const response = await fetch(`${API}/${id}`);
    const departamento = await response.json();
    if (!departamento) return;

    //carrega o modal de visualizar departamento
    const modal = document.getElementById("modal-visualizar-dep");

    //associa o id de dep a uma variavel global
    departamentoSelecionadoId = id;

    //coloca o nome do departamento no modal (id visualizarNomeDep)
    document.getElementById("visualizarNomeDep").textContent = departamento.nome;

    //carrega a tabela de cursos do departamento dentro do modal
    const tbody = document.getElementById("tabela-cursos-dep-body");

    if(!tbody) return;

    tbody.innerHTML = "";

    //constroi a tabela de cursos do departamento
    departamento.cursos.forEach(curso => {
        tbody.innerHTML += `
            <tr>
                <td>${curso.id}</td>
                <td>${curso.nome}</td>
                <td>${curso.turno}</td>
                <td>${curso.periodos}</td>
                <td>${curso.cargaHoraria}</td>
            </tr>
        `;
    });

    // abre modal
    modal.style.display = "flex";
}


async function excluirDepartamento(id) {
    
    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });
    
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