module.exports = app => {
    const medicine = require("../controllers/medicine.controller");
    const router = require("express").Router();

    router.get("/", medicine.findAll);
    router.post("/", medicine.add);
    router.get("/prefixes", medicine.getPrefixes);
    router.get("/prefixes/words", medicine.getPrefixesWithWords);
    router.get("/:id", medicine.findById);
    router.put("/:id", medicine.update);
    router.delete("/:id", medicine.delete);

    app.use('/api/medicine', router);
}