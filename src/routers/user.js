const router = require("express").Router();
const { User } = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const usersList = await User.find();
    res.send(usersList);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
