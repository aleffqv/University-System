fetch("../components/infos/modal-visualizar-professor.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("visualizar-professor-container").innerHTML = data;

        iniciarViewProfessor();
        carregarDepartamentosDropdown("departamentoProfDropdown");
})

function iniciarViewProfessor() {
    const modal = document.getElementById("modal-visualizar-professor");
    const btnFechar = document.getElementById("fecharViewProfessor");

    if (!modal || !btnFechar) return;

    btnFechar.addEventListener("click", () => {
        carregarDepartamentosDropdown("departamentoProfDropdown");
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
    
    window.addEventListener("keydown", (e) =>{
        if (e.key === "Escape") {
            modal.style.display = "none";
        }

    })    
}