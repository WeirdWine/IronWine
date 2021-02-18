const router = require("express").Router();
const { uploader, cloudinary } = require("../config/cloudinary");
const Wine = require("../models/Wine");
const User = require("../models/User.model");
const Shop = require("../models/Shop");
const axios = require('axios').default;



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
     vineyard: req.body.vineyard,
      year: req.body.year,
      price: req.body.price,
      stockist: req.body.stockist,
      colour: req.body.colour,
      bio: req.body.bio,
      rating: req.body.rating,
     country: req.body.country,
      imgPath: req.file.path,
      imgName:req.file.originalname,
      publicId: req.file.filename,
     owner: req.user.id,
     foodpairing: req.body.foodpairing,
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

let wineAllBg; 

      if(winesFromDB.colour === "red" ){
        wineAllBg = 'red';
      } else if( winesFromDB.colour === "white"){
        wineAllBg = '#cfc0a5';
      } else if(winesFromDB.colour === "orange"){
        wineAllBg = 'orange';
      } else {
        wineAllBg = '#ffadcf';
      }

      console.log('This is the background-wine colour speaking:', wineAllBg)

      res.render('wineRoute/wines', {allWines:winesFromDB, wineAllBg })
  }).catch(error => {
    console.log('sth went wrong while requesting all the wines from the DB', error);
  })
})

// Add comment to wineView

router.post("/wines/:id/comments", (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');
    return;
    }
  
  const wineId = req.params.id
  const user = req.user.id
  const comment = req.body.comment
  Wine.findOneAndUpdate({ _id: wineId }, { $push: { comments: {user: user, comments:comment}}})
  .then(() => {
    res.redirect(`/wines/${wineId}`);
  })
  .catch(err => {
    console.log(err);
  })
})

/* Detail Wine Route (Logged In) */

router.get("/wines/:id", async(req, res, next)=> {
    const selectedwineFromDB = await Wine.findById(req.params.id)
    .populate({
      path: "comments",
      populate:{
        path: 'user',
        model: 'User'
      }
    }); 

    const countryCode = await selectedwineFromDB.country;
    const country = await axios.get(`https://restcountries.eu/rest/v2/name/${countryCode}`);

 const countryFlag= country.data[0].flag;
 
 let bgColour;
    let foodHex;
    

    console.log(selectedwineFromDB.colour)
    if(selectedwineFromDB.colour === "red" ){
      bgColour = 'red';
    } else if( selectedwineFromDB.colour === "white"){
      bgColour = '#cfc0a5';
    } else if(selectedwineFromDB.colour === "orange"){
      bgColour = 'orange';
    } else {
      bgColour = '#ffadcf';
    }

    if(selectedwineFromDB.foodpairing === "cheese" ){
      foodHex = "🧀";
    } else if(selectedwineFromDB.foodpairing === "meat") {
      foodHex = "🥩";
    } else if(selectedwineFromDB.foodpairing === "veg"){
      foodHex = "🥗";
    } else if(selectedwineFromDB.foodpairing === "fruit") {
      foodHex = "🍓";
    }


  console.log(countryFlag);

res.render("wineRoute/wineView", {displayBottle: selectedwineFromDB, bgColour, foodHex,countryFlag});

})





module.exports = router;