fetch("../components/modal-professor.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("modal-professor-container").innerHTML = data;

        iniciarModalProfessor();
    })

function iniciarModalProfessor() { 
    const modal = document.getElementById("modal-professor");
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