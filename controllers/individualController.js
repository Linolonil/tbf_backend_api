const mongoKdaResults = require('../utils/mongoKDAModel');

const postPartidas = async (req, res) =>{
    try {
        const {collection} = await mongoKdaResults();
        const {id, partidas} = req.body;
    
        const bulkUpdateOperations = [];
    
        const existingJogador = await collection.findOne({ id });
    
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
    
          if (bulkUpdateOperations.length > 0) {
            await collection.bulkWrite(bulkUpdateOperations);
            console.log('Dados inseridos com sucesso');
          }
          res.status(200).json({ success: true });
    } catch (error) {
        console.log(error)
        res.status(500).json({Error: "Erro ao inserir dados", error})
    }

}


const getPartidas = async (req, res) => {
    try {
        const matchDetails = req.userMatch;

        res.status(200).json(matchDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao processar detalhes da partida' });
    }
};

export default {
    getPartidas,
    postPartidas
};
