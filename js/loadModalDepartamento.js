fetch("../components/modal-departamento.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("modal-dep-container").innerHTML = data;

        iniciarModalDepartamento();
    })

function iniciarModalDepartamento() { 
    const modal = document.getElementById("modal-departamento");
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
}    