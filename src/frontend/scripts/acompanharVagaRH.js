const urlParams = new URLSearchParams(window.location.search);
const idDaVaga = urlParams.get("id");

let btnCurriculos = document.querySelector('#lista-curriculos');
let btnTestes = document.querySelector('#lista-testes');
let btnEntrevistas = document.querySelector('#lista-entrevistas');

axios.get(`http://localhost:8081/detalheVagas?codVaga=${idDaVaga}`)
    .then(response => {
        if (response.status === 200) {
            const divTitulo = document.getElementById("main_title");
            divTitulo.innerHTML = `${response.data[0].tituloVaga}`;
        }
    })
    .catch(erro => {
        alert("Erro ao obter título da vaga");
    });

btnCurriculos.addEventListener('click', () => {
    window.location.href = `/lista-curriculos?id=${idDaVaga}`
})

btnTestes.addEventListener('click', () => {
    window.location.href = `/lista-testes?id=${idDaVaga}`
})

btnEntrevistas.addEventListener('click', () => {
    window.location.href = `/lista-entrevistas?id=${idDaVaga}`
})

