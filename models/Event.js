const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types







const EventScheme = new mongoose.Schema({


    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {

        type: String,
        required: true
    },
    type: {

        type: String,
        required: true
    },

    fromDate: {
        type: Date,
        required: true
    },

    toDate: {
        type: Date,
        required: true
    },

    capacity: {

        type: Number,
        required: true
    },
    price: {
        type: Number,

    },

    members: [
        { type: ObjectId, ref: "User" }
    ],

    by: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    country: {

        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,

    },
    area: {
        type: String,
        required: true,

    },
    location: {
        type: {
            type: String,
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: [Number]
    },




})

EventScheme.index({ location: "2dsphere" });

mongoose.model("Event", EventScheme)