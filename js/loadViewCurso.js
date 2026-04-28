fetch("../components/infos/modal-visualizar-curso.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("visualizar-curso-container").innerHTML = data;

        iniciarViewCurso();
})

function iniciarViewCurso() {
    const modal = document.getElementById("modal-visualizar-curso");
    const btnFechar = document.getElementById("fecharViewCurso");

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