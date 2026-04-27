fetch("../components/modal-turma.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("modal-turma-container").innerHTML = data;

        iniciarModalTurma();
    })

function iniciarModalTurma() { 
    const modal = document.getElementById("modal-turma");
    const btnAbrir = document.querySelector(".bt-cad");
    const btnFechar = document.getElementById("fecharModal");

    if (!modal || !btnAbrir || !btnFechar) return;

    btnAbrir.addEventListener("click", () => {
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