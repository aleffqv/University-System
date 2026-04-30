fetch("../components/modal-turma.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("modal-turma-container").innerHTML = data;

        iniciarModalTurma();
        carregarCursosDropdown("cursoTDropdown");
        let cursoId = document.getElementById("cursoTDropdown").value;
        carregarDisciplinasDropdown("disciplinaTDropdown", cursoId);
        carregarProfessoresDropdown("professorTDropdown", cursoId)
    })

function iniciarModalTurma() { 
    const modal = document.getElementById("modal-turma");
    const btnAbrir = document.querySelector(".bt-cad");
    const btnFechar = document.getElementById("fecharModal");
    const cursoSelect = document.getElementById("cursoTDropdown");
    //disciplinaSelect
    const disciplinaSelect = document.getElementById("disciplinaTDropdown");

    //dropdown de disciplinas - curso
    cursoSelect.addEventListener("change", function () {
        const cursoId = this.value;
        carregarDisciplinasDropdown("disciplinaTDropdown", cursoId);
    });

    disciplinaSelect.addEventListener("change", function () {
        const disciplinaId = this.value;
        carregarProfessoresDropdown("professorTDropdown", disciplinaId);
    });

    if (!modal || !btnAbrir || !btnFechar) return;

    btnAbrir.addEventListener("click", () => {
        carregarCursosDropdown("cursoTDropdown");
        let cursoId = document.getElementById("cursoTDropdown").value;
        carregarDisciplinasDropdown("disciplinaTDropdown", cursoId);
        modal.style.display = "flex";
    })

    btnFechar.addEventListener("click", () => {
        modal.style.display = "none";
    })

    window.addEventListener("click", (e) =>{
        if (e.target === modal) {
            modal.style.display = "none";
        }
    })

    window.addEventListener("keydown", (e) =>{
        if (e.key === "Escape") {
            modal.style.display = "none";
        }

    })    
}    