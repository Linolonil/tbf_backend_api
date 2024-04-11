import mongoResults from '../../utils/mongoKDAModel.js'
import  { ObjectId } from 'mongodb';


const buscarItensMongoDB = async (req, res, next) => {

    try {
     const { collection } = await mongoResults()
     const {id} = req.body

     const jogador = await collection.find({ _id: new ObjectId(id) }).toArray();

     const result = jogador.map( item => ({
        id,
        gameName: item.gameName,
        tagLine:item.tagLine
     }))

     req.jogador = result;        

    } catch (error) {
        console.error('Erro ao buscar contas Riot:', id);
        res.status(500).json({ error: 'Erro ao buscar contas Riot' });    
    }
    next()
};

export default buscarItensMongoDB;
