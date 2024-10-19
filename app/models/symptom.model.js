const { sequelize, Sequelize } = require("./sequelize");

const Symptom = sequelize.define("symptom", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        defaultValue: sequelize.literal("nextval('symptom_id_seq'::regclass)")
    },
    title: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    tableName: 'symptom',
    timestamps: false
});

module.exports = Symptom;