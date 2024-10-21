module.exports = app => {
    const disease = require("../controllers/disease.controller.js");
  
    const router = require("express").Router();

    router.get("/", disease.findAll);

    router.get("/:id", disease.findOne);

    router.get("/search/:search", disease.getBySearch)
  
    app.use('/api/diseases', router);
};