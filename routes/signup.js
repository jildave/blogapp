const router = require('express').Router();
const Blog = require('../models/Blog');

router.get("/signup", (req, res) => {
    
    res.render("signup");
})

module.exports = router;