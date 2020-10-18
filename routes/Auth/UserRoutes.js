const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = mongoose.model("User")
const Recipient = mongoose.model("Recipient")
const Event = mongoose.model("Event")
const requireLogin = require("../../middleware/requireLogin")






router.post("/joinEvent", requireLogin, (req, res) => {


    const { eventId, eventName, userName, userId, joinedDate, ticketPrice } = req.body

    if (!eventId || !eventName || !userName || !userId || !joinedDate) {


        return res.status(422).json({ error: "Invalid Fields" })
    }



    const recipient = new Recipient({

        eventId: eventId,
        eventName: eventName,
        userName: userName,
        userId: userId,
        joinedDate: joinedDate,
        ticketPrice: ticketPrice




    })

    recipient.save()
        .then((result) => {


            let member = {

                userId: userId,
                recipientId: result._id
            }

            Event.findByIdAndUpdate(eventId, {

                $push: { members: member }
            }, { new: true })
                .exec((error, result2) => {

                    if (error) {
                        return res.status(422).json({ error: error })

                    } else {


                        let event = {

                            eventId: eventId,
                            recipientId: result._id

                        }

                        User.findByIdAndUpdate(userId, {

                            $push: { events: event }
                        }, { new: true })
                            .exec((error, user) => {

                                if (error) {
                                    return res.status(422).json({ error: error })

                                } else {

                                    res.json({ recipient: result, user: user, event: result2 })
                                }


                            })


                    }

                })


        })





})


module.exports = router