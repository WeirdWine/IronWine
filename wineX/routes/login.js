const router = require("express").Router();

router.get("/login", (req, res, next) => {
    res.render("user/login")
    .catch(err => {
        console.log(err);
      })
  });

module.exports = router;