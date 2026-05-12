const API_MATRICULAS = "http://localhost:8080/matriculas";
const API_ALUNOS_MATRICULA = "http://localhost:8080/alunos";
const API_TURMAS_MATRICULA = "http://localhost:8080/turmas";


async function salvarMatricula() {

    const matricula = {

        alunoId:
            document.getElementById(
                "alunoTurmaDropdown"
            ).value,

        turmaId:
            document.getElementById(
                "turmaDropdown"
            ).value,

        dataMatricula:
            new Date().toISOString().split("T")[0]
    };

    await fetch(API_MATRICULAS, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(matricula)
    });

    renderizarTabelaMatriculas();

    alert("Matrícula realizada com sucesso!");
}

async function renderizarTabelaMatriculas() {

    const response = await fetch(API_MATRICULAS);

    const matriculas = await response.json();

    const tbody =
        document.getElementById(
            "tabela-matriculas-body"
        );

    if (!tbody) return;

    tbody.innerHTML = "";

    matriculas.forEach(matricula => {
        console.log(matricula);
        tbody.innerHTML += `
            <tr>
                <td>${matricula.id}</td>
                <td>${matricula.aluno.pessoa.nome}</td>
                <td>${matricula.aluno.curso.nome}</td>
                <td>${matricula.turma.disciplina.nome}</td>
                <td>${matricula.turma.disciplina.curso.nome}</td>
                <td>${matricula.dataMatricula}</td>
                <td>
                    <button onclick="editarMatricula(${matricula.id})"class="btn-editar">Editar</button>
                    <button onclick="visualizarMatricula(${matricula.id})"class="btn-visualizar">Visualizar</button>
                </td>
            </tr>
        `;
    });
}

 async function carregarAlunosDropdownMatricula() {

     const response =
         await fetch(API_ALUNOS_MATRICULA);
     const alunos =
         await response.json();
     const select =
         document.getElementById(
             "alunoTurmaDropdown"
         );

    if (!select) return;
     alunos.forEach(aluno => {
         select.innerHTML += `
             <option value="${aluno.id}">
                 ${aluno.pessoa.nome}
             </option>
         `;
     });
 }

async function carregarTurmasDropdown() {

    const response =
        await fetch(API_TURMAS_MATRICULA);

    const turmas =
        await response.json();

    const select =
        document.getElementById(
            "turmaDropdown"
        );

    if (!select) return;

    select.innerHTML =
        '<option value="">Selecione uma turma</option>';

    turmas.forEach(turma => {

        select.innerHTML += `
            <option value="${turma.id}">
                ${turma.nome}
                -
                ${turma.disciplina.nome}
            </option>
        `;
    });
}

document.addEventListener("click", function(e){

    if(e.target &&
       e.target.id === "btnMatricularTurma") {

        salvarMatricula();
    }
});

document.addEventListener("DOMContentLoaded", () => {

    carregarAlunosDropdownMatricula();

    carregarTurmasDropdown();

    renderizarTabelaMatriculas();
});