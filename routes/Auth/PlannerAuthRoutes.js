const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Planner = mongoose.model("Planner")
const bcrypt = require("bcrypt")



router.post("/planner/signUp", (req, res) => {



    const { name, email, password, picture, organization, type } = req.body

    if (!name || !email || !password || !type || !organization) {


        return res.status(422).json({ error: "PLease Fill All Fields" })
    }

    Planner.findOne({ email: email })
        .then((savedPlanner) => {

            if (savedPlanner) {


                return res.status(422).json({ error: "User Already Exists" })

            }

            bcrypt.hash(password, 7).then((hashedPassword) => {

                const planner = new Planner({

                    email: email,
                    password: hashedPassword,
                    name: name,
                    picture: picture,
                    type: type,
                    organization: organization

                })

                planner.save().then((NewPlanner) => {

                    res.json("Planner Saved")


                }).catch((error) => console.log(error))

            })

        }).catch((error) => console.log(error))


})




module.exports = router