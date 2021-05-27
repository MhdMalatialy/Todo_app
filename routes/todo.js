const express = require("express");
const router = new express.Router();
const Todo = require("../models/todo");

// Add new todo for specific user.

router.post("/todo", async (req, res) => {
  const todo = new Todo({
    information: req.body.info,
    owner: req.body.userId,
  });
  try {
    await todo.save();
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//Update an existing todo for specific user.
router.patch("/todo/:id", async (req, res) => {
  const _id = req.params.id;
  const owner = req.body.userId;
  const info = req.body.info;
  if (!info || !_id || !owner) {
    return res.status(401).send("incomplete info");
  }
  try {
    const todo = await Todo.findOne({
      _id,
      owner,
    });
    if (!todo) {
      return res.status(404).send("todo not found");
    }
    todo.information = info;
    await todo.save();
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.delete("/todo/:id", async (req, res) => {
  const _id = req.params.id;
  const owner = req.body.userId;

  if (!_id || !owner) {
    return res.status(401).send("incomplete info ");
  }
  try {
    const todo = await Todo.findOneAndDelete({
      _id,
      owner,
    });
    if (!todo) {
      return res.status(404).send("todo not found");
    }
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/todo/:id", async (req, res) => {
  const owner = req.body.userId;
  const _id = req.params.id;
  if (!_id || !owner) {
    return res.status(401).send("incomplete info ");
  }
  try {
    const todo = await Todo.findOne({
      _id,
      owner,
    });
    if (!todo) {
      return res.status(404).send("todo not found");
    }
    res.json(todo);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
