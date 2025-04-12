const express = require('express');
const router = express.Router();
const boletosController = require('../controllers/boletosController.js');

/**
 * @swagger
 * /boleto/:
 *   get:
 *     summary: Retorna todos os boletos ou um relatório em PDF.
 *     description: Lista todos os boletos com filtros opcionais ou retorna um relatório em PDF (Base64).
 *     tags:
 *       - Boletos
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Nome do sacado para filtrar os boletos.
 *       - in: query
 *         name: valor_inicial
 *         schema:
 *           type: number
 *         description: Valor mínimo do boleto.
 *       - in: query
 *         name: valor_final
 *         schema:
 *           type: number
 *         description: Valor máximo do boleto.
 *       - in: query
 *         name: id_lote
 *         schema:
 *           type: integer
 *         description: ID do lote para filtrar os boletos.
 *       - in: query
 *         name: relatorio
 *         schema:
 *           type: integer
 *         description: Se for 1, retorna um PDF em Base64.
 *     responses:
 *       200:
 *         description: Lista de boletos ou relatório em PDF retornado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 base64:
 *                   type: string
 *                   description: Base64 do PDF gerado.
 *                 boletos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID do boleto.
 *                       nome_sacado:
 *                         type: string
 *                         description: Nome do sacado.
 *                       id_lote:
 *                         type: integer
 *                         description: ID do lote.
 *                       valor:
 *                         type: number
 *                         description: Valor do boleto.
 *                       linha_digitavel:
 *                         type: string
 *                         description: Linha digitável do boleto.
 */
router.get('/', boletosController.getBoletos);

module.exports = router;