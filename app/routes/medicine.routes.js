module.exports = app => {
    const medicine = require("../controllers/medicine.controller");
    const router = require("express").Router();

    router.get("/", medicine.findAll);
    router.get("/:id", medicine.findById);
    router.get("/search/:search", medicine.findBySearch);

    app.use('/api/medicine', router);
}