module.exports = app => {
    const disease = require("../controllers/disease.controller.js");
  
    var router = require("express").Router();

    console.log(disease);
  
    router.get("/", disease.findAll);

    router.get("/:id", disease.findOne);
  
    app.use('/api/diseases', router);
};