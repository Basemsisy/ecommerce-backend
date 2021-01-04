const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv/config");

const api = process.env.API_PREFIX;
const CategoriesRouter = require("./routers/category");
const ordersRouter = require("./routers/order");
const productsRouter = require("./routers/product");
const usersRouter = require("./routers/user");

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));

//Routers
app.use(`${api}/categories`, CategoriesRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/products`, productsRouter);
app.use(`${api}/users`, usersRouter);

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
