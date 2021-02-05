const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const mysql = require("mysql")
const port =2000;
const bearerToken = require("express-bearer-token");
const {movieRouter, userRouter} = require("./router")

// main app
const app = express()

// apply middleware
app.use(cors())
app.use(bodyparser.json())
app.use(bearerToken());


// main route
const response = (req, res) => res.status(200).send('<h1>REST API JCWM-15</h1>')
app.get('/', response)

app.use("/movies", movieRouter)
app.use("/register", userRouter)

// bind to local machine
const PORT = process.env.PORT || 2000
app.listen(PORT, () => `CONNECTED : port ${PORT}`)