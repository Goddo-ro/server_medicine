module.exports = (sequelize, Sequelize) => {
    const DiseaseMedicine = sequelize.define("diseaseMedicine", {
        diseaseId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'disease',
                key: 'id'
            }
        },
        medicineId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'medicine',
                key: 'id'
            }
        }
    }, {
        tableName: 'diseaseMedicine',
        timestamps: false
    });

    return DiseaseMedicine;
}