const { sequelize, Sequelize } = require('./sequelize');
const Disease = require('./disease.model.js');
const Symptom = require('./symptom.model.js');
const Medicine = require('./medicine.model.js');
const DiseaseSymptom = require('./diseaseSymptom.model.js');
const DiseaseMedicine = require('./diseaseMedicine.model.js');

Symptom.belongsToMany(Disease, {
    through: DiseaseSymptom,
    foreignKey: 'symptomId',
    otherKey: 'diseaseId'
});

Disease.belongsToMany(Symptom, {
    through: DiseaseSymptom,
    foreignKey: 'diseaseId',
    otherKey: 'symptomId'
});

Disease.belongsToMany(Medicine, {
    through: DiseaseMedicine,
    foreignKey: 'diseaseId',
    otherKey: 'medicineId'
});

Medicine.belongsToMany(Disease, {
    through: DiseaseMedicine,
    foreignKey: 'medicineId',
    otherKey: 'diseaseId'
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.disease = Disease;
db.symptom = Symptom;
db.medicine = Medicine;
db.diseaseSymptom = DiseaseSymptom;
db.DiseaseMedicine = DiseaseMedicine;

module.exports = db;