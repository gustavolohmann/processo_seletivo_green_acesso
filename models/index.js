const Sequelize = require('sequelize');
const sequelize = require('../db');

const Lote = require('./loteModel')(sequelize, Sequelize.DataTypes);
const Boleto = require('./boletoModel')(sequelize, Sequelize.DataTypes);

module.exports = {
    sequelize,
    Lote,
    Boleto
};