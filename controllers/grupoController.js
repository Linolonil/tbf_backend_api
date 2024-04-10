const  mongoKdaResults  = require('../utils/mongoKDAModel');
const Partida = require("../models/Partidas");

const postPartidas = async (req, res) => {
  try {
    const { collection } = await mongoKdaResults();
    const partidaDetails = req.body.matchDetails;

    const bulkUpdateOperations = [];
    const bulkInsertOperations = [];


    for (const detalhesPartida of partidaDetails) {
      const { id, nickName, puuid, partidas } = detalhesPartida;

      const existingJogador = await collection.findOne({ id });

      if (existingJogador) {
        for (const partida of partidas) {
          const partidaExists = existingJogador.partidas.some(existingPartida => existingPartida.matchId === partida.matchId);

          if (!partidaExists) {
            existingJogador.partidas.push(partida);
          }
        }
        bulkUpdateOperations.push({
          updateOne: {
            filter: { id },
            update: { $set: { partidas: existingJogador.partidas } }
          }
        });
      } else {
        bulkInsertOperations.push({
          insertOne: {
            document: {
              id,
              nickName,
              puuid,
              partidas
            }
          }
        }
      );
    }
    }
    if (bulkUpdateOperations.length > 0) {
      await collection.bulkWrite(bulkUpdateOperations);
    }

    if (bulkInsertOperations.length > 0) {
      await collection.bulkWrite(bulkInsertOperations);
    }

    console.log('Dados inseridos com sucesso');
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao inserir detalhes da partida:', error);
    res.status(500).json({ error: 'Erro ao inserir detalhes da partida' });
  }
}

const getPartidas = async (req, res) => {
  try {
    const matchDetails = req.matchDetails;
    
    res.status(200).json(matchDetails)
  } catch (error) {
    console.error('Erro ao inserir detalhes da partida:', error);
    res.status(500).json({ error: 'Erro ao inserir detalhes da partida' });
  }
};

module.exports = {
  postPartidas,
  getPartidas
};