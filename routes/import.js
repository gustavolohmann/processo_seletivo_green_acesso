const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const controllerImport = require('../controllers/importController.js');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        const timestamp = Date.now();
        cb(null, `${name}-${timestamp}${ext}`);
    }
});
const upload = multer({ storage });
/**
 * @swagger
 * /document/import-csv:
 *   post:
 *     summary: Importa um arquivo CSV
 *     description: Envia um arquivo .csv contendo informações de boletos para serem importados.
 *     tags:
 *       - Importação
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo CSV contendo os boletos
 *     responses:
 *       200:
 *         description: Arquivo CSV importado com sucesso.
 *       400:
 *         description: Erro ao importar o arquivo CSV.
 */
router.post('/import-csv', upload.single('file'), controllerImport.importCSV);

/**
 * @swagger
 * /document/import-pdf:
 *   post:
 *     summary: Importa um arquivo PDF
 *     description: Envia um arquivo .pdf com informações estruturadas para serem processadas.
 *     tags:
 *       - Importação
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo PDF com os dados
 *     responses:
 *       200:
 *         description: Arquivo PDF importado com sucesso.
 *       400:
 *         description: Erro ao importar o arquivo PDF.
 */
router.post('/import-pdf', upload.single('file'), controllerImport.importPDF); 

module.exports = router;
