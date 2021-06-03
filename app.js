const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const User = require('./models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

mongoose.connect("mongodb://localhost:27017/blog_db", {
    useCreateIndex :true,
    useNewUrlParser : true,
    useUnifiedTopology : true
},() => {
    console.log("connected to mongodb")
})

const app = express()

app.use(express.json())

app.post('/change-password', async (req, res) => {
	const { token, newpassword: plainTextPassword } = req.body

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	try {
		const user = jwt.verify(token, JWT_SECRET)

		const _id = user.id

		const password = await bcrypt.hash(plainTextPassword, 10)

		await User.updateOne(
			{ _id },
			{
				$set: { password }
			}
		)
		res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: ';))' })
	}
})

app.post('/login', async (req, res) => {
	const { username, password } = req.body
	const user = await User.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET
		)

		return res.json({ status: 'ok', data: token })
		
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
})

app.post('/signup', async (req, res) => {
	const { username, password: plainTextPassword } = req.body

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await User.create({
			username,
			password
		})
		
		console.log('User created successfully: ', response)
		
	} catch (error) {
		if(error.code ===11000)
		
        return res.json({ status: 'error', error:'username already in use'})
		}
	throw error	
})



app.use('/assets',express.static("assets"))

//mongodb



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
app.use(require("./routes/login"))
app.use(require("./routes/change-password"))

app.get('*', (req,res) => {
   res.render('404');
});

app.listen(9999, () => {
	console.log('Server up at 9999')
})
