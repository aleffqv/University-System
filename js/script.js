async function carregarAlunos() {
  const resposta = await fetch("http://localhost:8080/alunos");
  const alunos = await resposta.json();

  const tabela = document.getElementById("tabela-alunos");
  tabela.innerHTML = ""; // limpa antes

  alunos.forEach(aluno => {
    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.curso}</td>
      <td>${aluno.disciplina}</td>
      <td>${aluno.professor}</td>
      <td>${aluno.sala}</td>
    `;

    tabela.appendChild(linha);
  });
}

// chama quando carregar a página
carregarAlunos();