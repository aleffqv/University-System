const departamentos = JSON.parse(localStorage.getItem("departamentos")) || [];

function salvarDepartamento(){
    const departamento = {
        id: Date.now(),
        nome: document.getElementById("nomeDep").value,
    };

    departamentos.push(departamento);

    localStorage.setItem("departamentos", JSON.stringify(departamentos));

    renderizarTabela();

    fecharModal();

    limparFormulario();
}

function renderizarTabela() {
    const tbody = document.getElementById("tabela-dep-body");
    tbody.innerHTML = "";

    departamentos.forEach(departamento => {
        tbody.innerHTML += `
            <tr>
                <td>${departamento.id}</td>
                <td>${departamento.nome}</td>
            </tr>
        `;
    });
}

function limparFormulario() {
    document.getElementById("nomeDep").value = "";
}

function fecharModal() {
    document.getElementById("modal-departamento").style.display = "none";
}

document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "btnSalvarDep") {
        salvarDepartamento();
    }
});

renderizarTabela();