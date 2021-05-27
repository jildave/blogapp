const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use('/assets',express.static("assets"))

//mongodb

mongoose.connect("mongodb://localhost:27017/blog_db", {
    useCreateIndex :true,
    useNewUrlParser : true,
    useUnifiedTopology : true
},() => {
    console.log("connected to mongodb")
})

//middlewares

app.use(express.urlencoded({
    extended : true
}))
app.use(express.static("public"))

app.set("view engine", "ejs")

//routes
app.use(require("./routes/index"))
app.use(require("./routes/compose"))
app.use(require("./routes/blog"))
app.use(require("./routes/signup"))

app.get('*', (req,res) => {
   res.render('404');
});

//server config
app.listen(3000, () => console.log("server listening on port 3000"));