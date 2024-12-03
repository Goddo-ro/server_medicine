const { Op } = require("sequelize");
const db = require("../models");
const Disease = db.disease;
const Medicine = db.medicine;
const Type = db.type;

// GET

module.exports.findAll = async (req, res) => {
    try {
        const startsWith = req.query.startsWith ?? '';
        const search = req.query.search ?? '';

        const startsWithCondition = startsWith
            ? {
                title: {
                    [Op.iLike]: `${startsWith}%`
                }
            }
            : {};

        const searchCondition = search
            ? {
                [Op.or]: [
                    {
                        title: {
                            [Op.iLike]: `%${search}%`
                        }
                    },
                    {
                        description: {
                            [Op.iLike]: `%${search}%`
                        }
                    }
                ]
            }
            : {};

        const whereCondition = {
            ...startsWithCondition,
            ...searchCondition
        };

        const medicine = await Medicine.findAll({
            where: whereCondition,
            include: [
                {
                    model: Disease,
                    as: 'diseases',
                    through: { attributes: [] }
                },
                {
                    model: Type,
                    as: 'type',
                }
            ]
        });

        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }

        res.json(medicine);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.findById = async (req, res) => {
    try {
        const id = req.params.id;

        const medicine = await Medicine.findOne({
            where: { id },
            include: [
                {
                    model: Disease,
                    as: 'diseases',
                    through: { attributes: [] }
                },
                {
                    model: Type,
                    as: 'type'
                } 
            ]
        })

        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }

        res.json(medicine);
    }  catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.getByName = async (req, res) => {
    try {
        const title = req.params.title ?? '';

        const medicine = await Medicine.findOne({
            where: {
                title: {
                    [Op.iLike]: `${title}`
                }
            },
            include: [
                {
                    model: Disease,
                    as: 'diseases',
                },
                {
                    model: Type,
                    as: 'type'
                } 
            ]
        })

        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }

        res.json(medicine);
    }  catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.getPrefixesWithWords = async (req, res) => {
    try {
        const startsWith = req.query.startsWith ?? '';

        const startsWithCondition = startsWith
            ? {
                title: {
                    [Op.iLike]: `${startsWith}%`
                }
            }
            : {};
        
        const medicine = await Medicine.findAll({
            where: startsWithCondition,
            include: [
                {
                    model: Disease,
                    as: 'diseases',
                    through: { attributes: [] }
                },
                {
                    model: Type,
                    as: 'type',
                }
            ],
            attributes: ['title', 'id'],
        });

        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }

        const groupedData = medicine.reduce((acc, { title, id }) => {
            const twoLetterPrefix = title.slice(0, 1).toUpperCase() + title.slice(1, 2).toLowerCase();

            if (!acc[twoLetterPrefix]) {
                acc[twoLetterPrefix] = [];
            }

            acc[twoLetterPrefix].push({title, id});

            return acc;
        }, {});

        res.json(groupedData);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    } 
}

module.exports.getPrefixes = async (req, res) => {
    try {
        const medicines = await Medicine.findAll({
            attributes: ['title'],
            raw: true
        });

        const groupedData = medicines.reduce((acc, { title }) => {
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

// POST

module.exports.add = async (req, res) => {
    try {
        const { title, type_id, description } = req.body;
        const newMedicine = await Medicine.create({ title, type_id, description });
        res.status(201).json(newMedicine);
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
}

// PUT

module.exports.update = async (req, res) => {
    try {
        const { id } = req.params;

        const medicine = await Medicine.findByPk(id);
        if (!medicine) {
            return res.status(404).json({ error: "Medicine not found" });
        }

        await medicine.update({
            ...medicine.dataValues,
            ...req.body
        });

        res.status(200).json(medicine);
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
}

// DELETE

module.exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const medicine = await Medicine.findByPk(id);
        if (!medicine) {
            return res.status(404).json({ error: "Medicine not found" });
        }

        await medicine.destroy();
        res.status(200).json({ message: "Medicine was successfully deleted" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};