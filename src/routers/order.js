const router = require("express").Router();
const { Order } = require("../models/order");

router.get("/", async (req, res) => {
  try {
    const ordersList = await Order.find();
    res.send(ordersList);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
