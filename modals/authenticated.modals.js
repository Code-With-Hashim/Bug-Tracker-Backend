const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password : { type: String, required: true }
} , {
    versionKey  : false,
    timeStamps : true
})

const userModals = mongoose.model('Bug_tracker_user', userSchema)

module.exports = { userModals }
