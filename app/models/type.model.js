const { sequelize, Sequelize } = require("./sequelize");

const Type = sequelize.define("type", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        defaultValue: sequelize.literal("nextval('disease_id_seq'::regclass)"),
    },
    title: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
}, {
    tableName: 'type',
    timestamps: false,
});

module.exports = Type;
