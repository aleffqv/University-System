fetch("../components/modal-aluno.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("modal-aluno-container").innerHTML = data;

        iniciarModalAluno();
})



function iniciarModalAluno() { 
    const modal = document.getElementById("modal-aluno");
    const btnAbrir = document.querySelector(".bt-cad");
    const btnFechar = document.getElementById("fecharModal");

    const btnAbrirAlunos = document.querySelector(".bt-cad");
    const btnAbrirHome = document.querySelector(".newaluno");

    if (!modal || !btnFechar) return;

    // Se achou o botão de Alunos, liga ele
    if (btnAbrirAlunos) {
        btnAbrirAlunos.addEventListener("click", () => modal.style.display = "flex");
    }

    // Se achou o card da Home, liga ele também!
    if (btnAbrirHome) {
        btnAbrirHome.addEventListener("click", () => modal.style.display = "flex");
    }

    btnFechar.addEventListener("click", () => modal.style.display = "none");

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

    document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "btnSalvarAluno") {
        salvarAluno();
    }
    });

}    