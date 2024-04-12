import mongoModel from '../utils/mongoConnection.js'

const buscarInfoCriminosos = async(req, res) =>{
    try {
        const {collection} = await mongoModel.mongoResults();

        const itens = await(collection.find().toArray());

        const result = itens.map(item => ({
            id: item._id,
            nome: item.nome,
            funcao: item.funcao,
            gameName: item.gameName,
            tagLine: item.tagLine,
            champion: item.champion,
            image: item.imagem,
        }))

        res.json(result)
    } catch (error) {
        console.log(error)
    }

}
const buscarInfoKda = async(req, res) =>{
    try {
        const {collection} = await mongoModel.mongoKdaResults();

        const itens = await(collection.find().toArray());

        const result = itens.map(item => ({
            id: item.id,
            nickName: item.nickName,
            gameName: item.gameName,
            puuid: item.puuid,
            partidas: [item.partidas.map((partidas)=> partidas)],
        }))

        res.json(result)
    } catch (error) {
        console.log(error)
    }

}

export default {
    buscarInfoCriminosos,
    buscarInfoKda
}