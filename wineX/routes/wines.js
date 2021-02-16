const router = require("express").Router();
const { uploader, cloudinary } = require("../config/cloudinary");
const Wine = require("../models/Wine");
const User = require("../models/User.model");
const Shop = require("../models/Shop");



/* MainWines Route (Logged In) */



router.get("/addwine", (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');
    return;
    }

  res.render("wineRoute/addWine");
});

router.post("/addwine", uploader.single('photo'), (req,res) => {

  console.log(req.body.comments);
    Wine.create({
     winename: req.body.winename,
      year: req.body.year,
      price: req.body.price,
      colour: req.body.colour,
      bio: req.body.bio,
      rating: req.body.rating,
     country: req.body.country,
      imgPath: req.file.path,
      imgName:req.file.originalname,
      publicId: req.file.filename,
     owner: req.body.author,
      // shop: req.body.shop,
    comments:[{  user: req.user.id, comments: req.body.comments}],
    
    cheese: null,


      

    }).then((dataToDB)=> {
        console.log('Data has been successfully added to the Dabase', dataToDB)
     
  
        res.redirect(`/wines/${dataToDB._id}`);
    }).catch(error => {
      console.log('sth went wrong while uploading data to the DB', error);
    })
    
})

router.get("/wines", (req,res) => {
  if (!req.user) {
    res.redirect('/login');
    return;
    }

  Wine.find().then(winesFromDB => {
      console.log(winesFromDB)
      res.render('wineRoute/wines', {allWines:winesFromDB })
  }).catch(error => {
    console.log('sth went wrong while requesting all the wines from the DB', error);
  })
})


/* Detail Wine Route (Logged In) */

router.get("/wines/:id", (req,res) => {
  Wine.findById(req.params.id).then((selectedwineFromDB) => {
    let bgColour = '';
    if(selectedwineFromDB.colour === 'red' ){
      bgColour = 'green';
    }
      console.log(selectedwineFromDB.winename);
      res.render("wineRoute/wineView", {displayBottle: selectedwineFromDB, farbe:bgColour})
  })
})


module.exports = router;