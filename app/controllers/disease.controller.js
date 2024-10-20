const db = require("../models");
const DiseaseSymptom = require("../models/diseaseSymptom.model");
const Disease = db.disease;
const Symptom = db.symptom;
const Medicine = db.medicine;

module.exports.findAll = async (req, res) => {
    try {
        const diseases = await Disease.findAll({
            include: [
                {
                    model: Symptom,
                    as: 'symptoms'
                },
                {
                    model: Medicine,
                    as: 'medicines'
                }
            ]
        })

        if (!diseases) {
            return res.status(404).json({ message: 'Diseases not found' });
        }

        res.json(diseases);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
    // Disease.findAll()
    //     .then(data => {
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //           message:
    //             err.message || "Some error occurred while retrieving tutorials."
    //         });
    //     });
};

module.exports.findOne = async (req, res) => {
    try {
        const diseaseId = req.params.id;

        const disease = await Disease.findOne({
            where: { id: diseaseId },
            include: [
                {
                    model: Symptom,
                    as: 'symptoms',
                    through: { attributes: [] }
                },
                {
                    model: Medicine,
                    as: 'medicines',
                    through: { attributes: [] }
                }
            ]
        });

        if (!disease) {
            return res.status(404).json({ message: 'Disease not found' });
        }

        res.json(disease);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
