const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  try {
    const usersList = await User.find().select("-hashPassword");
    res.send(usersList);
  } catch (err) {
    res.send(err);
  }
});

router.post("/register", (req, res) => {
  const user = new User(req.body);
  user.hashPassword = bcrypt.hashSync(req.body.password, 10);
  user
    .save()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .select("-hashPassword")
    .then((user) => {
      if (user) res.send(user);
      else res.send("not found this user");
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && bcrypt.compareSync(req.body.password, user.hashPassword)) {
      const token = jwt.sign(
        {
          userId: user.id,
          isAdmin: user.isAdmin,
        },
        process.env.SECRET,
        { expiresIn: "1d" }
      );
      user.hashPassword = undefined;
      res.send({ ...user._doc, token });
    } else res.send("not found this user");
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
