const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Event = mongoose.model("Event");

const requireLogin = require("../middleware/requireLogin");

router.post("/createEvent", requireLogin, (req, res) => {
  const {
    name,
    description,
    type,
    fromDate,
    toDate,
    capacity,
    price,
    by,
    picture,
    eventLocation,
  } = req.body;

  //console.log(name, description, type, fromDate, toDate, capacity, price, by, picture, eventLocation)

  if (
    !name ||
    !description ||
    !type ||
    !fromDate ||
    !toDate ||
    !capacity ||
    !price ||
    !by ||
    !picture ||
    !eventLocation
  ) {
    return res.status(422).json({ error: "PLease Fill All Fields" });
  }

  Event.findOne({ name: name })

    .then((savedEvent) => {
      if (savedEvent) {
        return res
          .status(422)
          .json({ error: "Please Choose a different Event Name" });
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
          coordinates: [eventLocation.latitude, eventLocation.longitude],
        },
      });

      event
        .save()
        .then((newEvent) => {
          res.json({ success: "Event Saved" });
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
});

router.get("/myEvents", requireLogin, (req, res) => {
  Event.find({ postedBy: req.user._id })
    .populate("members.userId", "name picture email")

    .then((result) => {
      res.json({ result: result });
    })
    .catch((error) => console.log(error));
});

router.post("/findNearestEvent", requireLogin, (req, res) => {
  const { latitude, longitude } = req.body;

  console.log("latitude -- >" + latitude);
  console.log("longitude-- >" + longitude);

  Event.find({
    location: {
      $near: {
        $maxDistance: 10000,

        $geometry: {
          type: "Point",
          coordinates: [latitude, longitude],
        },
      },
    },
  })
    .then((result) => {
      res.json({ result });
    })
    .catch((error) => console.log(error));
});

router.get("/homeEvents", requireLogin, (req, res) => {
  Event.aggregate([{ $sample: { size: 6 } }])

    // .populate("members.userId", "_id name")
    //  .populate("members.recipientId", "_id eventName")
    .then((result) => {
      res.json({ result });
    })
    .catch((error) => console.log(error));
});

router.get("/eventFindType", requireLogin, (req, res) => {
  const { type } = req.body;

  Event.find({ type: "Tour" })
    .then((result) => {
      res.json({ result });
    })
    .catch((error) => console.log(error));
});

router.get("/allEvents", requireLogin, (req, res) => {
  Event.find()
    .then((result) => {
      res.json({ result });
    })
    .catch((error) => console.log(error));
});

module.exports = router;
