fetch("../components/modal-disciplina.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("modal-disciplina-container").innerHTML = data;

        iniciarModalDisciplina();
        carregarCursoDropdown("cursoModalDropdown");
    })

function iniciarModalDisciplina() { 
    const modal = document.getElementById("modal-disciplina");
    const btnAbrir = document.querySelector(".bt-cad");
    const btnFechar = document.getElementById("fecharModal");

    if (!modal || !btnAbrir || !btnFechar) return;

    btnAbrir.addEventListener("click", () => {
        carregarCursoDropdown("cursoModalDropdown");
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