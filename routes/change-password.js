const router = require('express').Router();

const Users = require('../models/user');


router.get("/changepassword", (req, res) => {
    
    res.render("change-password.ejs");
})

module.exports = router;