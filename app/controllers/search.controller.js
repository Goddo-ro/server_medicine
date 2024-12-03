const { Op, where, fn, col } = require('sequelize');
const db = require('../models');
const Medicine = db.medicine;
const Disease = db.disease;

module.exports.findAllBySearch = async (req, res) => {
    try {
        const searchTerm = req.query.search || '';

        const diseases = await Disease.findAll({
            where: where(
                fn('lower', col('title')),
                {
                  [Op.like]: `%${searchTerm.toLowerCase()}%`
                }
              ),
        });

        const medicines = await Medicine.findAll({
            where: {
                title: {
                    [Op.iLike]: `%${searchTerm}%`
                }
            },
        });

        res.json({
            diseases: diseases || [],
            medicines: medicines || []
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
