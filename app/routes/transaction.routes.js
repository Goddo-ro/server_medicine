module.exports = app => {
    const transaction = require("../controllers/transaction.controller");
    const verifyToken = require('../middleware');
    const router = require("express").Router();

    router.get("/", transaction.findAll);

    app.use("/api/transactions", verifyToken, router);
}