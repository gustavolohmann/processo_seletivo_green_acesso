const { Boleto } = require('../models');
const { Op } = require('sequelize');
const PDFDocument = require('pdfkit');
const streamBuffers = require('stream-buffers');

exports.getBoletos = async (req, res) => {
    try {
        const { nome, valor_inicial, valor_final, id_lote, relatorio } = req.query;

        const filters = {};
        if (nome) {
            filters.nome_sacado = { [Op.like]: `%${nome}%` };
        }
        if (valor_inicial) {
            filters.valor = { ...filters.valor, [Op.gte]: parseFloat(valor_inicial) };
        }
        if (valor_final) {
            filters.valor = { ...filters.valor, [Op.lte]: parseFloat(valor_final) };
        }
        if (id_lote) {
            filters.id_lote = id_lote;
        }

        const boletos = await Boleto.findAll({ where: filters });

        if (relatorio === '1') {
            const pdfBuffer = await generatePDF(boletos);

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=relatorio_boletos.pdf');

            return res.send(pdfBuffer);
        }

        return res.status(200).json(boletos);
    } catch (error) {
        console.error('Erro ao buscar boletos:', error);
        return res.status(500).json({ error: 'Erro ao buscar boletos.' });
    }
};

const generatePDF = async (boletos) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 30 });
        const chunks = [];

        doc.on('data', (chunk) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        doc.fontSize(16).text('Relatório de Boletos', { align: 'center' });
        doc.moveDown();

        doc.fontSize(12).text('ID', 50, doc.y, { continued: true });
        doc.text('Nome Sacado', 100, doc.y, { continued: true });
        doc.text('ID Lote', 250, doc.y, { continued: true });
        doc.text('Valor', 300, doc.y, { continued: true });
        doc.text('Linha Digitável', 350, doc.y);
        doc.moveDown();

        boletos.forEach((boleto) => {
            doc.text(boleto.id.toString(), 50, doc.y, { continued: true });
            doc.text(boleto.nome_sacado, 100, doc.y, { continued: true });
            doc.text(boleto.id_lote.toString(), 250, doc.y, { continued: true });
            doc.text(boleto.valor.toString(), 300, doc.y, { continued: true });
            doc.text(boleto.dataValues.linha_digitavel = String(boleto.dataValues.linha_digitavel), 350, doc.y);
            doc.moveDown();
        });

        doc.end();
    });
};