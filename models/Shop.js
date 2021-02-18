const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Wine = require("./Wine")

const shopSchema = new Schema({
    shopname: String,
    url: String,
    location: String,
    wineMatch: [{type: Schema.Types.ObjectId, ref: Wine}]
})

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;