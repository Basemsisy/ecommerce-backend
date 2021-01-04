const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

const api = process.env.API_PREFIX;

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());
app.options("*", cors());

//Routers
app.use(`${api}/categories`, require("./routers/category"));
app.use(`${api}/orders`, require("./routers/order"));
app.use(`${api}/products`, require("./routers/product"));
app.use(`${api}/users`, require("./routers/user"));

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "ecommerce-db",
  })
  .then(() => {
    console.log("database connection is ready");
  })
  .catch((err) => {
    console.log("faild to connect to db", err);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server runing on port: ${PORT}`);
});
