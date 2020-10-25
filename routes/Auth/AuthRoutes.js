const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = mongoose.model("User")
const Planner = mongoose.model("Planner")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { JWTKey } = require("../../config/config")





router.post("/signIn", async (req, res) => {


    const { email, password } = req.body

    if (!email || !password) {

        return res.status(422).json({ error: "PLease Fill All Fields" })
    }




    User.findOne({ email: email })
        .then((savedUser) => {

            if (savedUser) {

                bcrypt.compare(password, savedUser.password)
                    .then((doMatch) => {

                        console.log("matching")
                        console.log(savedUser)

                        if (doMatch) {

                            const token = jwt.sign({ _id: savedUser._id }, JWTKey)

                            const { _id, name, email, picture } = savedUser;

                            return res.json({ token, user: { _id, name, email, picture } })

                        } else {

                            return res.json({ error: "Invalid Credentials" })
                        }

                    })
            } else {


                Planner.findOne({ email: email })
                    .then((savedPlanner) => {


                        if (savedPlanner) {

                            bcrypt.compare(password, savedPlanner.password)
                                .then((doMatch) => {

                                    console.log("matching")
                                    console.log(doMatch)

                                    if (doMatch) {

                                        const token = jwt.sign({ _id: savedPlanner._id }, JWTKey)

                                        const { _id, name, picture, type, organization } = savedPlanner;

                                        return res.json({ token, planner: { _id, name, email, picture, type, organization } })

                                    } else {

                                        return res.json({ error: "Invalid Credentials" })
                                    }

                                })
                        } else {


                            return res.json({ error: "Invalid Credentials" })
                        }

                    })

            }





        })
















})





module.exports = router