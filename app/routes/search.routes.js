module.exports = app => {
    const search = require("../controllers/search.controller");
    const router = require("express").Router();

    router.get("/", search.findAllBySearch);

    app.use('/api/search', router);
}