const matriculas = JSON.parse(localStorage.getItem("matriculas")) || [];

function matricularAlunoTurma(alunoId, turmaId){

    
    const alunos = JSON.parse(localStorage.getItem("alunos")) || [];
    const turmas = JSON.parse(localStorage.getItem("turmas")) || [];

    const aluno = alunos.find(a => a.id == alunoId);
    const turma = turmas.find(t => t.id == turmaId);

    if (!aluno || !turma) return;

    if (!aluno.cursoId) {
        alert("Aluno não está matriculado em um curso!");
        return;
    }

    
    if (aluno.cursoId != turma.cursoId) {
        alert("Aluno não pertence a este curso!");
        return;
    }

    
    const jaExiste = matriculas.find(m =>
        m.alunoId == alunoId && m.turmaId == turmaId
    );

    if (jaExiste) {
        alert("Aluno já está matriculado nessa turma!");
        return;
    }

    
    const matriculadosNaTurma = matriculas.filter(m => m.turmaId == turmaId);

    if (matriculadosNaTurma.length >= turma.nvagast) {
        alert("Turma lotada!");
        return;
    }

    
    const novaMatricula = {
        id: Date.now(),
        alunoId,
        turmaId,
        data: new Date().toLocaleDateString()
    };

    matriculas.push(novaMatricula);

    localStorage.setItem("matriculas", JSON.stringify(matriculas));

    alert("Matrícula realizada com sucesso!");
    renderizarTabelaMatriculas();
}

function renderizarTabelaMatriculas() {
    
    const tbody = document.getElementById("tabela-matriculas-body");
    if(!tbody) return;

    const matriculas = JSON.parse(localStorage.getItem("matriculas")) || [];
    const cursos = JSON.parse(localStorage.getItem("cursos")) || [];
    const alunos = JSON.parse(localStorage.getItem("alunos")) || [];
    const turmas = JSON.parse(localStorage.getItem("turmas")) || [];

    tbody.innerHTML = "";
    matriculas.forEach(matricula => {
        const aluno = alunos.find(a => a.id == matricula.alunoId);
        const turma = turmas.find(t => t.id == matricula.turmaId);
        const curso = cursos.find(c => c.id == turma.cursoId);

        tbody.innerHTML += `
            <tr>
                <td>${matricula.id}</td>
                <td>${aluno.nome}</td>
                <td>${turma.nomet} - ${getNomeDisciplina(turma.disciplinaId)}</td>
                <td>${curso.nomec}</td>
                <td>${matricula.data}</td>
                <td>
                    <button onclick="editarMatricula(${matricula.id})" class="btn-editar" data-id="${matricula.id}">Editar</button>
                    <button onclick="visualizarMatricula(${matricula.id})" class="btn-visualizar" data-id="${matricula.id}">Visualizar</button>
                </td>
            </tr>
        `;
    });
}

document.addEventListener("click", function(e){
    if(e.target && e.target.id === "btnMatricularTurma"){
        const alunoId = document.getElementById("alunoTurmaDropdown").value;
        const turmaId = document.getElementById("turmaDropdown").value;

        if(!alunoId || !turmaId){
            alert("Selecione um aluno e uma turma para matricular!");
            return;
        }

        
        matricularAlunoTurma(alunoId, turmaId);
    }
});

function getNomeDisciplina(id){
    const disciplinas = JSON.parse(localStorage.getItem("disciplinas")) || [];
    const disciplina = disciplinas.find(d => d.id == id);
    return disciplina ? disciplina.nomed: "Nenhuma disciplina encontrada"

}

// Só executa se a página tiver a tabela de matrículas
if (document.getElementById("tabela-matriculas-body")) {
    renderizarTabelaMatriculas();
}