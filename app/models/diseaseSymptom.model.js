module.exports = (sequelize, Sequelize) => {
    const DiseaseSymptom = sequelize.define("diseasesymptom", {
        diseaseId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'disease',
                key: 'id'
            }
        },
        symptomId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'symptom',
                key: 'id'
            }
        }
    }, {
        tableName: 'diseaseSymptom',
        timestamps: false
    });

    return DiseaseSymptom;
}