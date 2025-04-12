module.exports = (sequelize, DataTypes) => {
    const Lote = sequelize.define('Lote', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING(100)
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
        tableName: 'lotes',
        timestamps: false
    });

    Lote.associate = (models) => {
        Lote.hasMany(models.Boleto, { foreignKey: 'id_lote' });
    };

    return Lote;
};
