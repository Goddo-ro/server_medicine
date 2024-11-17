const { fn, col, Op, where } = require("sequelize");
const db = require("../models");
const Disease = db.disease;
const Symptom = db.symptom;
const Medicine = db.medicine;

module.exports.findAll = async (req, res) => {
    try {
        const diseases = await Disease.findAll({
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
        })

        if (!diseases) {
            return res.status(404).json({ message: 'Diseases not found' });
        }

        res.json(diseases);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
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

module.exports.findBySearch = async (req, res) => {
    try {
        const searchTerm = req.params.search || '';

        const disease = await Disease.findOne({
            where: where(
                fn('lower', col('title')),
                {
                  [Op.like]: `%${searchTerm.toLowerCase()}%`
                }
              ),
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
            return res.status(404).json({ message: 'Diseases not found' });
        }

        res.json(disease);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.getPrefixes = async (req, res) => {
    try {
        const diseases = await Disease.findAll({
            attributes: ['title'],
            raw: true
        });

        const groupedData = diseases.reduce((acc, { title }) => {
            const firstLetter = title[0].toUpperCase();
            const twoLetterPrefix = title.slice(0, 1).toUpperCase() + title.slice(1, 2).toLowerCase();

            if (!acc[firstLetter]) {
                acc[firstLetter] = new Set();
            }

            acc[firstLetter].add(twoLetterPrefix);

            return acc;
        }, {});

        const result = {};

        for (const [letter, prefixes] of Object.entries(groupedData)) {
            result[letter] = Array.from(prefixes);
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
}