const connection = require('../database/connection');

module.exports = {
    async create(req, res) {
        const { title, description, value} = req.body;
        const ong_id = req.headers.authorization;

        const [id] = await connection('incident').insert({
            title,
            description,
            value,
            ong_id
        })

        return res.json({ id });
    },
    async index(req, res) {
        const { page = 1 } = req.query;

        const count   = await connection('incident').count();
        const incidents = await connection('incident')
            .join('ongs', 'ongs.id', '=', 'incident.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incident.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        // Passando paginação via headers
        res.header('X-Total-Count', count[0]['count(*)']);

        return res.json(incidents)
    },
    async delete(req, res){
        const id = req.params.id;
        const ong_id = req.headers.authorization;

        const incident = await connection('incident')
            .where('id', id)
            .select('ong_id')
            .first();
        
        if(ong_id == 'undefined' && incident.ong_id !== ong_id) {
            return res.status(401).json({error:"Operação não permitida."});
        }

        await connection('incident').where('id', id).delete();
        return res.json({msg: "Caso deletado com sucesso!"});
    },
    async show(req, res) {
        const id = req.params.id;
        const incident = await connection('incident').where('id', id).select('*');
        
        if(!incident.length) {
            return res.json({error:'Caso não encontrado.'})
        }

        return res.json(incident);
    }
}