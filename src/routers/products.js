const router = require("express").Router();

const { Product } = require("../models/product");

router.post(`/`, (req, res) => {
  const newProduct = new Product(req.body);
  newProduct
    .save()
    .then((product) => {
      res.send(product);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
