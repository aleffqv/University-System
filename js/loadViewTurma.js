fetch("../components/infos/modal-visualizar-turma.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("visualizar-turma-container").innerHTML = data;

        iniciarViewTurma();
})

function iniciarViewTurma() {
    const modal = document.getElementById("modal-visualizar-turma");
    const btnFechar = document.getElementById("fecharViewTurma");

    if (!modal || !btnFechar) return;

    btnFechar.addEventListener("click", () => {
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