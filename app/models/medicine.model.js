const { sequelize, Sequelize } = require("./sequelize");

const Medicine = sequelize.define("medicine", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        defaultValue: sequelize.literal("nextval('medicine_id_seq'::regclass)")
    },
    title: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true,
    }
}, {
    tableName: 'medicine',
    timestamps: false
});

module.exports = Medicine;
