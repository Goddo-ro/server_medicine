module.exports = app => {
    const disease = require("../controllers/disease.controller.js");
    const router = require("express").Router();

    router.get("/", disease.findAll);
    router.get("/prefixes", disease.getPrefixes);
    router.get("/prefixes/words", disease.getPrefixesWithWords);
    router.get("/search/:search", disease.findBySearch);
    router.get("/:id", disease.findOne);
  
    app.use('/api/disease', router);
};