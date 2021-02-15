const router = require("express").Router();
const Wine = require("../models/Wine");
const User = require("../models/User.model");
const Shop = require("../models/Shop");
const Comment = require("../models/Comment");


/* MainWines Route (Logged In) */



router.get("/addWine", (req, res, next) => {
  res.render("wineRoute/addWine");
});

router.post("/addWine", (req,res) => {
    Wine.create({
      winename: req.body.winename,
      year: req.body.year,
      price: req.body.price,
      colour: req.body.colour,
      bio: req.body.bio,
      country: req.body.country,
       imgPath: req.file.path,
       imgName:req.file.originalname,
       publicId: req.file.filename,
      owner: req.body.author,
      shop: req.body.shop,
      comments: req.body.comments
    }).then((dataToDB)=> {
        console.log('Data has been successfully added to the Dabase', dataToDB)
        // res.redirect(`/wines/${dataToDB._id}`);
        res.render("index");
    }).catch(error => {
      console.log('sth went wrong while uploading data to the DB', error);
    })
})

router.get("/wines", (req,res) => {
  Wine.find().then(winesFromDB => {
      console.log(winesFromDB)
      res.render('wineRoute/wines', {allWines:winesFromDB })
  }).catch(error => {
    console.log('sth went wrong while requesting all the wines from the DB', error);
  })
})


module.exports = router;