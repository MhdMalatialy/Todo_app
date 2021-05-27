const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
userSchema.methods.generateAutoToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWTSECRET);
  return token;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password"))
    user.password = await bcrypt.hash(user.password, 8);
  next();
});
const User = mongoose.model("User", userSchema);
module.exports = User;
