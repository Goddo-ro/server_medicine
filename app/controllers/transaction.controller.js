const db = require("../models");
const Transaction = db.transaction;
const Medicine = db.medicine;

module.exports.findAll = async (req, res) => {
    try {
        const transactions = await Transaction.findAll({
            include: [
                {
                    model: Medicine,
                    as: 'medicine',
                },
            ]
        });

        if (!transactions) {
            return res.status(404).json({ message: 'Diseases not found' });
        }

        res.json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}