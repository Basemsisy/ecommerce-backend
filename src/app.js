require("dotenv/config");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const authMiddleware = require("./helpers/middlewares");
const errorHandler = require("./helpers/errorHandler");

const app = express();
const api = process.env.API_PREFIX;

app.use(cors());
app.options("*", cors());

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(authMiddleware());
app.use(errorHandler);

//Routers
app.use(`${api}/categories`, require("./routers/categories"));
app.use(`${api}/orders`, require("./routers/orders"));
app.use(`${api}/products`, require("./routers/products"));
app.use(`${api}/users`, require("./routers/users"));

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
