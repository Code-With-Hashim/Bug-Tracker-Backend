require('dotenv').config();
const express = require('express');
const cors = require('cors')

const {connect} = require('./config/db')
const {userRoutes} = require("./routes/authenticated.routes")

const app = express()
const PORT = process.env.PORT

app.use(cors({
    origin :"*"
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("/" , userRoutes)

app.get('/', (req, res) => res.send({
    message: 'Hello World'
}))

app.listen(PORT, async () => {
    try {
        await connect
        console.log('Database is connect Successfully')
        console.log(`Listening on http://localhost:${PORT}`)
    } catch (error) {
        console.log(error)
    }
})