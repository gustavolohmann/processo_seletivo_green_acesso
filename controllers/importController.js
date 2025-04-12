const xlsx = require('xlsx');
const { Lote, Boleto } = require('../models');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

exports.importPDF = async (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
    }

    const filePath = file.path;

    try {
        const pdfBytes = fs.readFileSync(filePath);
        const pdfDoc = await PDFDocument.load(pdfBytes);

        const totalPages = pdfDoc.getPageCount();
        console.log(totalPages);
        const boletos = await Boleto.findAll({ order: [['nome_sacado', 'ASC']] });
        if (boletos.length !== totalPages) {
            return res.status(400).json({ error: 'Número de páginas no PDF não corresponde ao número de boletos.' });
        }

        const outputDir = path.join(__dirname, '../uploads/desmembrados');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        for (let i = 0; i < totalPages; i++) {
            const boleto = boletos[i];
            const newPdfDoc = await PDFDocument.create();
            const [page] = await newPdfDoc.copyPages(pdfDoc, [i]);
            newPdfDoc.addPage(page);

            const pdfBytes = await newPdfDoc.save();
            const outputFilePath = path.join(outputDir, `${boleto.id}.pdf`);
            fs.writeFileSync(outputFilePath, pdfBytes);
        }

        return res.status(200).json({ message: 'PDF processado e desmembrado com sucesso.' });
    } catch (error) {
        console.error('Erro ao processar o arquivo PDF:', error);
        return res.status(500).json({ error: 'Erro ao processar o arquivo PDF.' });
    }
};

exports.importCSV = async (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
    }

    const filePath = file.path;

    try {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet, { defval: '' });

        for (const row of data) {
            const nomeSacado = row.nome || row.nome_sacado;
            const unidade = row.unidade?.toString().padStart(4, '0');
            const valor = parseFloat(row.valor);
            const linhaDigitavel = row.linha_digitavel;

            let lote = await Lote.findOne({ where: { nome: unidade } });

            if (!lote) {
                lote = await Lote.create({ nome: unidade, ativo: true });
            }

            await Boleto.create({
                nome_sacado: nomeSacado,
                id_lote: lote.id,
                valor: valor,
                linha_digitavel: linhaDigitavel,
                ativo: true,
            });
        }

        return res.status(200).json({ message: 'Boletos importados com sucesso', totalImportados: data.length });
    } catch (error) {
        console.error('Erro ao processar o arquivo:', error);
        return res.status(500).json({ error: 'Erro ao processar o arquivo' });
    }
};


