const { Op } = require("sequelize");
const db = require("../models");
const Disease = db.disease;
const Medicine = db.medicine;
const Type = db.type;

module.exports.findAll = async (req, res) => {
    try {
        const medicine = await Medicine.findAll({
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

module.exports.findBySearch = async (req, res) => {
    try {
        const searchTerm = req.params.search || '';

        const medicine = await Medicine.findAll({
            where: {
                [Op.or]: [
                    {
                        title: {
                            [Op.iLike]: `%${searchTerm}%`
                        }
                    },
                    {
                        description: {
                            [Op.iLike]: `%${searchTerm}%`
                        }
                    }
                ]
            }
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