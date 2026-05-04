const matriculas = JSON.parse(localStorage.getItem("matriculas")) || [];
const alunos = JSON.parse(localStorage.getItem("alunos")) || [];
const turmas = JSON.parse(localStorage.getItem("turmas")) || [];

function matricularAlunoTurma(alunoId, turmaId){

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
}