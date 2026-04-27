fetch("../components/infos/modal-visualizar-dep.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("modal-visualizar-dep-container").innerHTML = data;

        iniciarViewDep();
});

function iniciarViewDep(){
    const modal = document.getElementById("modal-visualizar-dep");
    const btnFechar = document.getElementById("fecharViewDep");

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