const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const ong_id    = req.headers.authorization;

        const ong       = await connection('ongs').where('id', ong_id).select('*');
        const incidents = await connection('incident').where('ong_id', ong_id).select('*');

        if(!ong_id) return res.json({error:"Operação não permitida."}) 

        if(!incidents.length) return res.json({ong, incidents:"Nenhum caso registrado."})
        
        return res.json({ong, incidents});
    }
}