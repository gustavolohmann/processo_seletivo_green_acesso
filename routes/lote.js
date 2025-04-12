const express = require('express');
const router = express.Router();
const controllerLote = require('../controllers/loteController');

/**
 * @swagger
 * /lote/create-lote:
 *   post:
 *     summary: Cria um novo lote
 *     description: Cria um novo lote físico com nome e status ativo.
 *     tags:
 *       - Lotes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "0001"
 *               ativo:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Lote criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lote criado com sucesso."
 *                 lote:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nome:
 *                       type: string
 *                       example: "0001"
 *                     ativo:
 *                       type: boolean
 *                       example: true
 *                     criado_em:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-04-10T14:48:00.000Z"
 *       400:
 *         description: Requisição inválida.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "O campo 'nome' é obrigatório."
 *       500:
 *         description: Erro interno do servidor.
 */
router.post('/create-lote', controllerLote.createLote);

module.exports = router;
