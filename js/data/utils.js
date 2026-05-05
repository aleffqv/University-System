// utils.js
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

function getNomeProfessor(id){
    const professores = JSON.parse(localStorage.getItem("professores")) || [];
    const professor = professores.find(p => p.id == id);
    return professor ? professor.nomep: "Nenhum professor encontrado"
}