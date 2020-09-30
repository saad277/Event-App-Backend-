const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt")
const Event = mongoose.model("Event")

const requireLogin = require("../../middleware/requireLogin")




router.post("/createEvent", requireLogin, (req, res) => {


    const { name, description, type, fromDate, toDate, capacity, price, by, picture, eventLocation } = req.body


    //console.log(name, description, type, fromDate, toDate, capacity, price, by, picture, eventLocation)

    if (!name || !description || !type || !fromDate || !toDate || !capacity || !price || !by || !picture || !eventLocation) {


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
                fromDate: fromDate,
                toDate: toDate,
                capacity: capacity,
                price: price,
                by: by,
                picture: picture,
                country: eventLocation.country,
                city: eventLocation.county,
                loc: {
                    type: "Point",
                    coordinates: [eventLocation.latitude, eventLocation.longitude]
                }
            })

            event.save().then((newEvent) => {

                res.json({ success: "Event Saved" })

            }).catch((error) => console.log(error))

        }).catch((error) => console.log(error))


})


module.exports = router