const express = require("express");
const router = new express.Router();
const User = require("../models/user");

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    const token = await user.generateAutoToken();
    await user.save();
    res.status(201).send({ token });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
