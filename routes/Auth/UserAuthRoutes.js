const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = mongoose.model("User")
const bcrypt = require("bcrypt")



router.post("/user/signUp", (req, res) => {



    const { name, email, password, picture } = req.body

    if (!name || !email || !password) {


        return res.status(422).json({ error: "PLease Fill All Fields" })
    }

    User.findOne({ email: email })
        .then((savedUser) => {

            if (savedUser) {


                return res.status(422).json({ error: "User Already Exists" })

            }

            bcrypt.hash(password, 10).then((hashedPassword) => {

                const user = new User({

                    email: email,
                    password: hashedPassword,
                    name: name,
                    picture: picture

                })

                user.save().then((newUser) => {

                    res.json("User Saved")


                }).catch((error) => console.log(error))

            })

        }).catch((error) => console.log(error))


})




module.exports = router
