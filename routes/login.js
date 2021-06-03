const router = require('express').Router();
const User = require('../models/user');


router.get("/login", (req, res) => {
    
    res.render("login.ejs");
})

module.exports = router;