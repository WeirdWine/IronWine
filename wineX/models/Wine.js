const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User.model");
const Shop = require("./Shop");

const wineSchema = new Schema({
      wineName: String,
      year: String,
      price: Number,
      colour: {
        type: String,
        enum: ['white', 'red', 'rose', 'orange']
      },
      bio: Boolean,
      country: String,
      imgPath: String,
      owner: [{type: Schema.Types.ObjectId, ref: User}],
      shop: [{type: Schema.Types.ObjectId, ref: Shop}],
      comments: [{
        user: {type: Schema.Types.ObjectId, ref: User},
        comment: String
      }]
       
});

const Wine = mongoose.model("Wine", wineSchema);

module.exports = Wine;