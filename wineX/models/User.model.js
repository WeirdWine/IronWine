const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  firstName: String,
  surname: String,
  username: {
    type: String,
    unique: true
  },
  password: String,
  dateOfBirth: Date,
  email: String,
  imgPath: String 
});

const User = model("User", userSchema);

module.exports = User;
