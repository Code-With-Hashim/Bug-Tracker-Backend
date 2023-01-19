const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { userModals } = require("../modals/authenticated.modals")

const userRoutes = express.Router()
const SECRET_KEY = process.env.SECRET_KEY

userRoutes.post("/signup", async (req, res) => {
    const { email, password } = req.body

    console.log(email, password)

    try {

        const existingUser = await userModals.findOne({ email })

        if (existingUser) {
            res.status(403).send({
                message: "User is Already been exist",
                status: 'false'
            })
        } else {
            bcrypt.hash(password, 5, async function (err, hash) {

                if (err) {
                    res.status(404).send({
                        message: 'Something went wrong, Please try again',
                        status: 'false'
                    })
                } else {
                    await userModals.create({ email, password: hash })
                    res.send({
                        message: 'User Created Successfully',
                        status: 'ok'
                    })
                }

            });
        }


    } catch (error) {
        console.log(error)
        res.status(404).send({
            message: 'Something went wrong, Please try again',
            status: 'false'
        })
    }
})

userRoutes.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {

        const isUserExist = await userModals.findOne({ email })

        if (isUserExist) {
            bcrypt.compare(password, isUserExist.password , function (err, result) {
                const token = jwt.sign({ userId : isUserExist._id }, SECRET_KEY)
                if(result) {
                    res.status(200).send({
                        message : 'Login Successful',
                        token,
                        status :'Ok'
                    })
                } else {
                    res.status(401).send({
                        message : 'Invalid Credentials',
                        status :'false'
                    })
                }
            });
        } else {
            res.status(401).send({
                message : 'Invalid Credentials',
                status :'false'
            })
        }


    } catch (error) {
        console.log(error)
        res.status(404).send({
            message : 'Something went wrong , please try again',
            status :'false'
        })
    }
})

module.exports = { userRoutes }
