module.exports = app => {
    const type = require("../controllers/type.controller");
    const router = require("express").Router();

    router.get("/", type.findAll);

    app.use("/api/types", router);
}