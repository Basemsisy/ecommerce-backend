const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");

// middlewares
app.use(bodyParser.json());
app.use(morgan("tiny"));

require("dotenv/config");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server runing on port: ${PORT}`);
});
