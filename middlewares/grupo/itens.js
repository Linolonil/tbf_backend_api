import mongoResults from '../../utils/mongoModel';

const buscarItensMongoDB = async (req, res, next) => {
 try {
    const { collection } = await mongoResults();
    
    console.info("buscando itens...!");

    const itens = await collection.find().toArray();

    const result = itens.map(item => ({ id: item._id, gameName: item.gameName, tagLine: item.tagLine }));
    
    req.jogadores = result;
    
    next();
 } catch (error) {
    console.error('Erro ao buscar contas Riot:');
    res.status(500).json({ error: 'Erro ao buscar contas Riot' });
 }
};

export default buscarItensMongoDB;
