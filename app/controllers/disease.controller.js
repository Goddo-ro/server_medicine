const db = require("../models");
const Disease = db.disease;

console.log(Disease);

module.exports.findAll = (req, res) => {
    Disease.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

module.exports.findOne = (req, res) => {
    const id = req.params.id;

    Disease.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Disease with id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Disease with id=${id}`
            });
        });
};