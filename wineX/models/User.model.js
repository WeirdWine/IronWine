const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  age: Date,
  email: {
    type: String,
    unique: true
  },
  imgPath: String 
});

const User = model("User", userSchema);

module.exports = User;

