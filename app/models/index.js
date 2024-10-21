const { sequelize, Sequelize } = require('./sequelize');
const Disease = require('./disease.model.js');
const Symptom = require('./symptom.model.js');
const Medicine = require('./medicine.model.js');
const Type = require('./type.model.js');
const DiseaseSymptom = require('./diseaseSymptom.model.js');
const DiseaseMedicine = require('./diseaseMedicine.model.js');

Symptom.belongsToMany(Disease, {
    through: DiseaseSymptom,
    foreignKey: 'symptom_id',
    otherKey: 'disease_id'
});

Disease.belongsToMany(Symptom, {
    through: DiseaseSymptom,
    foreignKey: 'disease_id',
    otherKey: 'symptom_id'
});

Disease.belongsToMany(Medicine, {
    through: DiseaseMedicine,
    as: 'medicines',
    foreignKey: 'disease_id',
    otherKey: 'medicine_id'
});

Medicine.belongsToMany(Disease, {
    through: DiseaseMedicine,
    as: 'diseases',
    foreignKey: 'medicine_id',
    otherKey: 'disease_id'
});

Medicine.belongsTo(Type, {
    foreignKey: 'type_id',
    as: 'type'
});

Type.hasMany(Medicine, {
    foreignKey: 'type_id',
    as: 'medicines'
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.disease = Disease;
db.symptom = Symptom;
db.medicine = Medicine;
db.type = Type;
db.diseaseSymptom = DiseaseSymptom;
db.DiseaseMedicine = DiseaseMedicine;

module.exports = db;