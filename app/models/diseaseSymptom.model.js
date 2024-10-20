const { sequelize, Sequelize } = require("./sequelize");
const Disease = require('./disease.model');
const Symptom = require('./symptom.model');

const DiseaseSymptom = sequelize.define("disease_symptom", {
    disease_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: Disease,
            key: 'id'
        }
    },
    symptom_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: Symptom,
            key: 'id'
        }
    }
}, {
    tableName: 'disease_symptom',
    timestamps: false
});

module.exports = DiseaseSymptom;