module.exports = (sequelize, DataTypes) => {
    const Boleto = sequelize.define('Boleto', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome_sacado: {
            type: DataTypes.STRING(255)
        },
        id_lote: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        valor: {
            type: DataTypes.DECIMAL(10, 2)
        },
        linha_digitavel: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        criado_em: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'boletos',
        timestamps: false
    });

    Boleto.associate = (models) => {
        Boleto.belongsTo(models.Lote, { foreignKey: 'id_lote' });
    };

    return Boleto;
};