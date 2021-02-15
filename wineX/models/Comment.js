const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User.model");

const commentSchema = new Schema({
    body: String,
    date: Date,
    user: [{type: Schema.Types.ObjectId, ref: User}]
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;