module.exports = app => {
    const transaction = require("../controllers/transaction.controller");
    const verifyToken = require('../middleware');
    const router = require("express").Router();

    router.get("/", transaction.findAll);
    router.post("/", transaction.add);
    router.put("/:id", transaction.update);
    router.delete("/:id", transaction.delete);

    app.use("/api/transactions", verifyToken, router);
}