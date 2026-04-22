const professores = JSON.parse(localStorage.getItem("professores")) || [];

function salvarProfessor(){
    const professor = {
        id: Date.now(),
        nomep: document.getElementById("nomep").value,
        cpfp: document.getElementById("cpfp").value,
        generop: document.getElementById("generoDropdown").value,
        emailp: document.getElementById("emailp").value,
        telefonep: document.getElementById("telefonep").value,
        datanascimentop: document.getElementById("datanascimentop").value,
        especializacaop: document.getElementById("especializacaop").value,
        titulacaop: document.getElementById("titulacaop").value
    };

    professores.push(professor);
    localStorage.setItem("professores", JSON.stringify(professores));

    renderizarTabela();
    fecharModal();
    limparFormulario();
}
