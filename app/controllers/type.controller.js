const db = require("../models");
const Type = db.type;

module.exports.findAll = async (req, res) => {
    try {
        const types = await Type.findAll();

        if (!types) {
            return res.status(404).json({ message: 'Diseases not found' });
        }

        res.json(types);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}