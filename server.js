const express = require("express");
require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');

const app = express();

var corsOptions = {
  origin: "http://localhost",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log(err)
    console.log("Failed to sync db: " + err.message);
  });

require("./app/routes/disease.routes")(app);
require("./app/routes/medicine.routes")(app);
require("./app/routes/transaction.routes")(app);
require("./app/routes/types.routes")(app);
require("./app/routes/firebase.routes")(app);
require("./app/routes/search.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
