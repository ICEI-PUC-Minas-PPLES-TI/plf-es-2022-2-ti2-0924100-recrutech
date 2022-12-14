//contém todas as funções que vão interagir diretamente com o banco de dados
const connection = require('./connection');

/*Funçao que lista todas as vagas*/
const listarVagasModel = async () => {
  const [vagas] = await connection.execute('SELECT * FROM status_vaga as statusVaga CROSS JOIN vaga as vaga ON statusVaga.codigoStatus = vaga.codigoStatus;');
  return vagas;
};

/*Funçao que cria uma vaga */
const criarVagaModel = async (vaga, codigoUsuario) => {
  const { descricao, qtdVagas, requisitos, senioridade, codigoStatus, tempoExperienciaVaga, tituloVaga, localModalidade } = vaga.body;

  const query = 'INSERT INTO vaga(descricao, qtdVagas, requisitos, senioridade, codigoStatus, tempoExperienciaVaga, tituloVaga, localModalidade, codigoUsuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const [vagaCriada] = await connection.execute(query, [descricao, qtdVagas, requisitos, senioridade, codigoStatus, tempoExperienciaVaga, tituloVaga, localModalidade, codigoUsuario]);

  return vagaCriada;
};

const uploadTesteModel = async (codVaga, url) => {
  const codigoVaga = codVaga.codigoVaga;
  const urlTeste = url.location;

  const query = 'INSERT INTO teste_vaga(codigoVaga, urlTeste) VALUES (?, ?)';
  const [testeCriado] = await connection.execute(query, [codigoVaga, urlTeste]);

  return testeCriado;
};

/*Funçao de uma vaga específica RH*/
const vagaEspecificaModel = async (idVaga) => {
  const especificacaoVaga = await connection.execute(`SELECT * FROM vaga WHERE codigoVaga = ${idVaga}`);
  return especificacaoVaga;
}

/*Funçao de uma vaga específica User*/
const vagaEspecificaUserModel = async (idVaga) => {
  const especificacaoVaga = await connection.execute(`SELECT * FROM vaga WHERE codigoVaga = ${idVaga}`);
  return especificacaoVaga;
}

const deletarVagaModel = async (codVaga) => {
  const vagaModificada = await connection.execute(`UPDATE vaga SET codigoStatus = 3 WHERE codigoVaga = ${codVaga}`);
  return vagaModificada;
}

/*Funçao que lista todas as vagas criadas de acordo com o usuario do rh*/
const listarVagasCriadas = async (codigoUsuario) => {
  const vagas = await connection.execute(`SELECT * FROM vaga v join status_vaga sv on v.codigoStatus = sv.codigoStatus WHERE v.codigoUsuario = ${codigoUsuario}`);
  return vagas;
};

module.exports = {
  listarVagasModel,
  criarVagaModel,
  uploadTesteModel,
  vagaEspecificaModel,
  vagaEspecificaUserModel,
  deletarVagaModel,
  listarVagasCriadas
};