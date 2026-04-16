fetch("../components/modal-aluno.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("modal-aluno-container").innerHTML = data;

        iniciarModalAluno();
    })

function iniciarModalAluno() { 
    const modal = document.getElementById("modal-aluno");
    const btnAbrir = document.querySelector(".bt-cad-aluno");
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
}    