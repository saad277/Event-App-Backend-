const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt")
const Event = mongoose.model("Event")

const requireLogin = require("../../middleware/requireLogin")




router.post("/createEvent", requireLogin, (req, res) => {


    const { name, description, type, from, to, capacity, price, by } = req.body


    if (!name || !description || !type || !from || !to || !capacity || !price || !by) {


        return res.status(422).json({ error: "PLease Fill All Fields" })

    }

    Event.findOne({ name: name })

        .then((savedEvent) => {


            if (savedEvent) {

                return res.status(422).json({ error: "Please Choose a different Event Name" })
            }


            const event = new Event({


                name: name,
                description: description,
                type: type,
                from: from,
                to: to,
                capacity: capacity,
                price: price,
                by: by,
            })

            event.save().then((newEvent)=>{
               
                res.json({ success: "Event Saved" })

            }).catch((error) => console.log(error))

        }).catch((error) => console.log(error))


})


module.exports=router