const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  information: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
});

const todo = mongoose.model("Todo", todoSchema);
module.exports = todo;
