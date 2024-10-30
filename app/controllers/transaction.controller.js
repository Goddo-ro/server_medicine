const db = require("../models");
const { 
    admin
} = require('../config/firebase.config');
const Transaction = db.transaction;
const Medicine = db.medicine;

// GET

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
            return res.status(404).json({ message: 'Transactions not found' });
        }

        res.json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// POST

module.exports.add = async (req, res) => {
    try {
        const { medicine_id, count, purchase_date, expiration_date } = req.body;
        const token = req.cookies['access_token'];
        const decodedToken = await admin.auth().verifyIdToken(token, true)
        const uid = decodedToken.uid;
        const transactionData = {
            medicine_id,
            count,
            purchase_date: purchase_date || new Date(),
            expiration_date,
            user_uid: uid,
        };
        const newTransaction = await Transaction.create(transactionData);
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

// PUT

module.exports.update = async (req, res) => {
    try {
        const { id } = req.params;

        const transaction = await Transaction.findByPk(id);
        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        await transaction.update({ ...transaction, ...req.body });
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

// DELETE

module.exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const transaction = await Transaction.findByPk(id);
        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        await transaction.destroy();
        res.status(200).json({ message: "Transaction was deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};