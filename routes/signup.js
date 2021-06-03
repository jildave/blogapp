const router = require('express').Router();
const user = require('../models/user');


router.get("/signup", (req, res) => {
    
    res.render("signup.ejs");
})

module.exports = router;