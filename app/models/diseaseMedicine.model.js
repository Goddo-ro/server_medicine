const { sequelize, Sequelize } = require("./sequelize");

const DiseaseMedicine = sequelize.define("diseaseMedicine", {
    disease_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: 'disease',
            key: 'id'
        }
    },
    medicine_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: 'medicine',
            key: 'id'
        }
    }
}, {
    tableName: 'disease_medicine',
    timestamps: false
});

module.exports = DiseaseMedicine;
