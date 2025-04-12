
const { Lote } = require('../models');

exports.createLote = async (req, res) => {
    const { nome, ativo } = req.body;
    try {
        if (!nome) {
            return res.status(400).json({ error: 'Nome do lote é obrigatório.' });
        }
        const create = await Lote.create({ nome: nome, ativo: ativo });
        return res.status(201).json({ message: 'Lote criado com sucesso.', data: create });
    } catch (e) { console.error(e) }
};