const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User.model");
const Shop = require("./Shop");

const wineSchema = new Schema({
      winename: String,
      year: String,
      price: Number,
      colour: String,
      bio: Boolean,
      country: String,
      imgName: String,
      imgPath: String,
      publicId: String,
      cheese: String,
      owner: [{type: Schema.Types.ObjectId, ref: User}],
      shop: [{type: Schema.Types.ObjectId, ref: Shop}],
     
      comments: [{
       // user: {type: Schema.Types.ObjectId, ref: User},
        comments: String
      }]
      
   
       
});

const Wine = mongoose.model("Wine", wineSchema);

module.exports = Wine;