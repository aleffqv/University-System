const professores = JSON.parse(localStorage.getItem("professores")) || [];
const departamentos = JSON.parse(localStorage.getItem("departamentos")) || [];


let modoEdicao = false;
let professorSelecionadoId = null;

function salvarProfessor(){

    if (modoEdicao) {
        const professor = professores.find(prof => prof.id === professorSelecionadoId);

        if (professor) {
            professor.nomep = document.getElementById("nomep").value;
            professor.cpfp = document.getElementById("cpfp").value;
            professor.generop = document.getElementById("generoDropdown").value;
            professor.departamentoId = document.getElementById("departamentoDropdown").value;
            professor.emailp = document.getElementById("emailp").value;
            professor.telefonep = document.getElementById("telefonep").value;
            professor.datanascimentop = document.getElementById("datanascimentop").value;
            professor.especializacaop = document.getElementById("especializacaop").value;
            professor.titulacaop = document.getElementById("titulacaop").value;
        }
        
        modoEdicao = false;

        document.getElementById("btnSalvarProf").textContent = "Cadastrar";

    } else {
        const professor = {
        id: Date.now(),
        nomep: document.getElementById("nomep").value,
        cpfp: document.getElementById("cpfp").value,
        generop: document.getElementById("generoDropdown").value,
        departamentoId: document.getElementById("departamentoProfDropdown").value,
        emailp: document.getElementById("emailp").value,
        telefonep: document.getElementById("telefonep").value,
        datanascimentop: document.getElementById("datanascimentop").value,
        especializacaop: document.getElementById("especializacaop").value,
        titulacaop: document.getElementById("titulacaop").value,
        turmaId: null
        };

        if(!professor.departamentoId){
            alert("Selecione um departamento!");
            return;
        }

        professores.push(professor);
    }

    localStorage.setItem("professores", JSON.stringify(professores));

    renderizarTabela();
    fecharModal();
    limparFormulario();
}

document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "btnSalvarProf") {
        salvarProfessor();
    }
});



function renderizarTabela() {
    
    const tbody = document.getElementById("tabela-professores-body");
    tbody.innerHTML = "";
        professores.forEach(professor => {
        tbody.innerHTML += `
            <tr>
                <td>${professor.id}</td>
                <td>${professor.nomep}</td>
                <td>${getNomeDepartamento(professor.departamentoId)}</td>
                <td>${professor.generop}</td>
                <td>${professor.titulacaop}</td>
                <td>
                    <button onclick="editarProfessor(${professor.id})" class="btn-editar" data-id="${professor.id}">Editar</button>
                    <button onclick="visualizarProfessor(${professor.id})" class="btn-visualizar" data-id="${professor.id}">Visualizar</button>
                </td>
            </tr>
        `;
    });
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

function limparFormulario() {
    document.getElementById("nomep").value = "";
    document.getElementById("cpfp").value = "";
    document.getElementById("generoDropdown").value = "";
    document.getElementById("emailp").value = "";
    document.getElementById("telefonep").value = "";
    document.getElementById("datanascimentop").value = "";
}

function fecharModal() {
    document.getElementById("modal-professor").style.display = "none";
    //resta estado de edicao
    modoEdicao = false;
    document.getElementById("btnSalvarProf").textContent = "Cadastrar"; //deixa o botao como estava antes
}

function visualizarProfessor(id) {
    const professor = professores.find(prof => prof.id === id);
    if (!professor) return;

    const modal = document.getElementById("modal-visualizar-professor");

    professorSelecionadoId = id; //necessario para a função de excluir

    document.getElementById("visualizarNomeP").textContent = professor.nomep;
    document.getElementById("visualizarCpfP").textContent = professor.cpfp;
    document.getElementById("visualizarGeneroP").textContent = professor.generop;
    document.getElementById("visualizarEmailP").textContent = professor.emailp;
    document.getElementById("visualizarTelefoneP").textContent = professor.telefonep;
    document.getElementById("visualizarDataNascimentoP").textContent = professor.datanascimentop;
    document.getElementById("visualizarEspecializacaoP").textContent = professor.especializacaop;
    document.getElementById("visualizarTitulacaoP").textContent = professor.titulacaop;

    modal.style.display = "flex";
}

//BOTÃO DE EXCLUIR ALUNO DENTRO DO MODAL DE VISUALIZAR ALUNO
document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "btnExcluirModal") {
        excluirProfessor();
    }
});

//BOTÃO DE EDITAR ALUNO DENTRO DO MODAL DE VISUALIZAR ALUNO
document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "btnEditarModal") {
        editarProfessor(professorSelecionadoId);
    }
});



function excluirProfessor(id) {
    const index = professores.findIndex(prof => prof.id === professorSelecionadoId);
    if (index !== -1) {
        professores.splice(index, 1);
    }

    localStorage.setItem("professores", JSON.stringify(professores));
    document.getElementById("modal-visualizar-professor").style.display = "none";   

    renderizarTabela();
}

function editarProfessor(id) {
    professorSelecionadoId = id;
    const professor = professores.find(prof => prof.id === professorSelecionadoId); 
    if (!professor) return;
    document.getElementById("nomep").value = professor.nomep;
    document.getElementById("cpfp").value = professor.cpfp;
    document.getElementById("generoDropdown").value = professor.generop;
    document.getElementById("emailp").value = professor.emailp;
    document.getElementById("telefonep").value = professor.telefonep;
    document.getElementById("datanascimentop").value = professor.datanascimentop;
    document.getElementById("especializacaop").value = professor.especializacaop;
    document.getElementById("titulacaop").value = professor.titulacaop;
    modoEdicao = true;

    document.getElementById("btnSalvarProf").textContent = "Salvar";

    document.getElementById("modal-visualizar-professor").style.display = "none";
    document.getElementById("modal-professor").style.display = "flex";


}

function getNomeDepartamento(id){
    const departamentos = JSON.parse(localStorage.getItem("departamentos")) || [];
    const departamento = departamentos.find(dep => dep.id == id);
    return departamento ? departamento.nome: "Nenhum departamento encontrado"
}

//precisa ficar no final do arquivo para sempre ser recarregada, evita erros de salvar e não aparecer a tabela atualizada 
renderizarTabela();