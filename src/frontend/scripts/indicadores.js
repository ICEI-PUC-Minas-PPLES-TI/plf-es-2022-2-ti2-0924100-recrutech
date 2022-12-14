const uri = "http://localhost:8081/indicadores"
const taxaMesUri = "/indicador-taxa-vagas"
const taxaUsuariosUri = "/indicador-taxa-usuarios"

const abrirIndicador = async (codigo) => {
  window.location.href = `/indicadores`;
}

const taxaCrescimentoVaga = (data) => {
        const pTaxa = document.getElementById("vagasMensais");
        pTaxa.innerHTML = data;
    };

async function getVagas() {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')
  
    const data = await fetch(taxaMesUri, {
      method: 'GET',
      headers: headers
    }).then(response => {
      return response.json()
    })

    taxaCrescimentoVaga(data);

};
const taxaCrescimentoUsuario = (data) => {
  const pTaxa = document.getElementById("novosUsuarios");
  pTaxa.innerHTML = data;
};

async function getUsuarios() {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Accept', 'application/json')

  const data = await fetch(taxaUsuariosUri, {
    method: 'GET',
    headers: headers
  }).then(response => {
    return response.json()
  })

  taxaCrescimentoVaga(data);

};

btn.addEventListener('click', () => {
  window.location.href = `/idicadores `
})