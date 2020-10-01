const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
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
                area: eventLocation.label,
                postedBy: req.user,
                location: {
                    type: "Point",
                    coordinates: [eventLocation.latitude, eventLocation.longitude]
                }
            })

            event.save().then((newEvent) => {

                res.json({ success: "Event Saved" })

            }).catch((error) => console.log(error))

        }).catch((error) => console.log(error))


})



router.post("/myEvents",requireLogin,(req,res)=>{


    Event.find({postedBy:req.user._id})
   
    .then((result)=>{


        res.json({ result:result })


    }).catch((error) => console.log(error))


})




router.post("/findNearestEvent", requireLogin, (req, res) => {


    const { latitude, longitude } = req.body



    Event.find({

        location: {

            $near: {
                $maxDistance: 1000,

                $geometry: {
                    type: "Point",
                    coordinates: [24.8585, 67.04107]
                }
            }
        }
    }).then(result => {

        res.json({ result })
    })

})


module.exports = router