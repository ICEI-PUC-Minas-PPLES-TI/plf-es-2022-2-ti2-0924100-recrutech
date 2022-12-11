const codigoUsuario = document.cookie.split(';')[1].split('=')[1];
let textoHTML = '';

axios.get(`http://localhost:8081/listar-vagas-inscritas?codUser=${codigoUsuario}`)
    .then(response => {
        if (response.status === 200) {
            preencherDivVagas(response.data)
            console.log(response.data);
        }
    })
    .catch(erro => {
        alert("Erro ao obter lista de vagas inscritas!");
    });

const preencherVagasInscritas = (dadosCurriculo) => {
    let nomeVaga = dadosCurriculo.tituloVaga;
    let modalidadeTrabalho = dadosCurriculo.localModalidade;
    let codigoVaga = dadosCurriculo.codigoVaga;

    textoHTML += `
    <div class="new-vaga">
    <div class="vaga">
      <div class="vaga-info">
        <div id="nome-vaga">${nomeVaga}</div>
        <div id="modalidade">${modalidadeTrabalho}</div>
            <div class="button_container">
                <button class="button" id="visualizar" onClick="abrirAcompanhamentoVaga(${codigoVaga})">VISUALIZAR</button>
            </div>
        </div>
            <div id="line"></div>
        </div>
    </div>`;
    return textoHTML;
};

const preencherDivSemVaga = () => {
    textoHTML += `
      <div class="div-sem-vagas">
        <p>
          Você ainda não se inscreveu em nenhuma vaga!
        </p>
      </div>`
        ;
    return textoHTML;
};

const preencherDivVagas = (dados) => {
    const divVaga = document.getElementById("container-vagas");
    if (dados.length !== 0) {
        dados.forEach((dadosVagas) => {
            divVaga.innerHTML = preencherVagasInscritas(dadosVagas);
        });
    } else {
        divVaga.innerHTML = preencherDivSemVaga();
    }
};

const abrirAcompanhamentoVaga = async (codigo) => {
    window.location.href = `/acompanhar-vaga?id=${codigo}`;
}