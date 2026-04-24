const departamentos = JSON.parse(localStorage.getItem("departamentos")) || [];
const cursos = JSON.parse(localStorage.getItem("cursos")) || [];

let modoEdicao = false;
let cursoSelecionadoId = null;


function salvarCurso(){
    if (modoEdicao) {
        const curso = cursos.find(c => c.id === cursoSelecionadoId);

    } else {
        const curso = {
            id: Date.now(),
            nomec: document.getElementById("nomec").value,
            departamentoId: document.getElementById("departamentoDropdown").value,
            cargaHorariac: document.getElementById("cargaHorariac").value,
            turno: document.getElementById("turnoDropdown").value,
            periodos: document.getElementById("periodosc").value
        }

        cursos.push(curso);
    }
    localStorage.setItem("cursos", JSON.stringify(cursos));

    renderizarTabela();
    limparFormulario();
    fecharModal();
}


document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "btnSalvarCurso") {
        salvarCurso();
    }
});


function limparFormulario() {
    document.getElementById("nomec").value = "";
    document.getElementById("departamentoDropdown").value = "";
    document.getElementById("cargaHorariac").value = "";
    document.getElementById("turnoDropdown").value = "";
    document.getElementById("periodosc").value = "";
}

function fecharModal() {
    document.getElementById("modal-curso").style.display = "none";
    //resta estado de edicao
    modoEdicao = false;
    document.getElementById("btnSalvarCurso").textContent = "Cadastrar"; //deixa o botao como estava antes
}