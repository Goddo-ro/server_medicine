module.exports = app => {
    const diseases = require("../controllers/disease.controller.js");
  
    var router = require("express").Router();

    console.log(diseases);
  
    router.get("/", diseases.findAll);

    router.get("/:id", diseases.findOne);
  
    app.use('/api/diseases', router);
};