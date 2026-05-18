const API = "http://localhost:8080/professores";
const API_DEP = "http://localhost:8080/departamentos";

let modoEdicao = false;
let professorSelecionadoId = null;

async function salvarProfessor() {

    const professor = {

        nome: document.getElementById("nomep").value,
        cpf: document.getElementById("cpfp").value,
        genero: document.getElementById("generoDropdown").value,
        email: document.getElementById("emailp").value,
        telefone: document.getElementById("telefonep").value,
        dataNascimento: document.getElementById("datanascimentop").value,
        status: "ATIVO",

        especializacao: document.getElementById("especializacaop").value,
        titulacao: document.getElementById("titulacaop").value,

        departamentoId:
            document.getElementById("departamentoProfDropdown").value
    };

    if (modoEdicao) {

        await fetch(`${API}/${professorSelecionadoId}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(professor)
        });

        modoEdicao = false;

        document.getElementById("btnSalvarProf")
            .textContent = "Cadastrar";

    } else {

        await fetch(API, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(professor)
        });
    }

    renderizarTabela();

    fecharModal();

    limparFormulario();
}

document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "btnSalvarProf") {
        salvarProfessor();
    }
});



async function renderizarTabela() {

    const response = await fetch(API);

    const professores = await response.json();
    
    const tbody = document.getElementById("tabela-professores-body");
    tbody.innerHTML = "";
        professores.forEach(professor => {
        tbody.innerHTML += `
                <tr>
                    <td>${professor.id}</td>
                    <td>${professor.nome || ''}</td>
                    <td>${professor.departamentoNome || ''}</td>
                    <td>${professor.genero || ''}</td>
                    <td>${professor.status || ''}</td>
                    <td>
                        <button onclick="editarProfessor(${professor.id})" class="btn-editar">Editar</button>
                        <button onclick="visualizarProfessor(${professor.id})" class="btn-visualizar">Visualizar</button>
                    </td>
                </tr>
            `;
    });
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


async function visualizarProfessor(id) {

    const response = await fetch(`${API}/${id}`);
    const professor = await response.json();
    if (!professor) return;

    const modal = document.getElementById("modal-visualizar-professor");

    professorSelecionadoId = id; //necessario para a função de excluir

    document.getElementById("visualizarNomeP").textContent = professor.nome;
        document.getElementById("visualizarCpfP").textContent = professor.cpf;
        document.getElementById("visualizarGeneroP").textContent = professor.genero;
        document.getElementById("visualizarEmailP").textContent = professor.email;
        document.getElementById("visualizarTelefoneP").textContent = professor.telefone;
        document.getElementById("visualizarDataNascimentoP").textContent = professor.dataNascimento;
        document.getElementById("visualizarEspecializacaoP").textContent = professor.especialidade;
        document.getElementById("visualizarTitulacaoP").textContent = professor.titulacao;

    const tbodyTurmas = document.getElementById("tabela-professores-turma");
    tbodyTurmas.innerHTML = "";

    professor.pessoa.turmas.forEach(turma => {
        tbodyTurmas.innerHTML += `
                    <tr>
                        <td>${turma.id}</td>
                        <td>${turma.nome || ''}</td>
                        <td>${turma.disciplinaNome || ''}</td>
                        <td>${turma.cursoNome || ''}</td>
                        <td>${professor.nome || ''}</td>
                        <td>${turma.sala || ''}</td>
                        <td>${turma.horario || ''}</td>
                        <td>${turma.nvagas || ''}</td>
                    </tr>
                `;
    });

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



async function excluirProfessor(id) {
    
    await fetch(`${API}/${professorSelecionadoId}`, {
        method: "DELETE"
    })

    document.getElementById("modal-visualizar-professor").style.display = "none";   

    renderizarTabela();
}

async function editarProfessor(id) {

    const response = await fetch(`${API}/${id}`);

    const professor = await response.json();

    if (!professor) return;

    professorSelecionadoId = id;

    document.getElementById("nomep").value = professor.nome || '';
    document.getElementById("cpfp").value = professor.cpf || '';
    document.getElementById("generoDropdown").value = professor.genero || '';
    document.getElementById("emailp").value = professor.email || '';
    document.getElementById("telefonep").value = professor.telefone || '';
    document.getElementById("datanascimentop").value = professor.dataNascimento || '';
    document.getElementById("especializacaop").value = professor.especialidade || '';
    document.getElementById("titulacaop").value = professor.titulacao || '';
    document.getElementById("departamentoProfDropdown").value = professor.departamentoId || '';

    modoEdicao = true;

    document.getElementById("btnSalvarProf").textContent = "Salvar";

    document.getElementById("modal-visualizar-professor").style.display = "none";

    document.getElementById("modal-professor").style.display = "flex";
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

function getNomeDepartamento(id){
    const departamentos = JSON.parse(localStorage.getItem("departamentos")) || [];
    const departamento = departamentos.find(dep => dep.id == id);
    return departamento ? departamento.nome: "Nenhum departamento encontrado"
}

function getNomeProfessor(id){
    const professores = JSON.parse(localStorage.getItem("professores")) || [];
    const professor = professores.find(p => p.id == id);
    return professor ? professor.nomep: "Nenhum professor encontrado"

}

document.addEventListener("DOMContentLoaded", () => {

    carregarDepartamentosDropdown("departamentoProfDropdown");

    renderizarTabela();
});

//precisa ficar no final do arquivo para sempre ser recarregada, evita erros de salvar e não aparecer a tabela atualizada 
renderizarTabela();