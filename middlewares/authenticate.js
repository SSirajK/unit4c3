require('dotenv').config()
const express = require('express')
const router = express.Router()
const User = require("../models/user.model")
const upload = require("../middlewares/upload")
const jwt = require("jsonwebtoken")

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRET_KEY, (err,decoded) =>{
            if(err){
                return reject(err)
            }
            return resolve(decoded)
        })
    })
}
const authenticate = async (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(500).send({message: "Incorrect token"})
    }
    if(!req.headers.authorization.startsWith("Bearer ")){
        return res.status(500).send({message: "Incorrect token"})
    }
    const token = req.headers.authorization.trim().split(" ")[1]
    let decoded;
    try {
        decoded = await verifyToken(token)
    } catch (err) {
        return res.status(500).send({message: "Incorrect token"})
    }

    req.userId = decoded.user._id;

    return next();
}


router.get("", async (req, res) =>{
    try {
        const user = await User.find().lean().exec()

        return res.status(200).send({user})
    } catch (err) {
        return res.status(500).semd({message: err.message})
    }

})

router.post("", upload.single("profileImages"), async (req, res) =>{
    try {
        const user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            email: req.body.email,
            profileImages: req.file.path,
        })

        return res.status(200).send({user})
    } catch (err) {
        return res.status(500).send({message: err.message})
    }
})

module.exports = {authenticate, router};