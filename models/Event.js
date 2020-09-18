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

    from: {
        type: String,
        required: true
    },

    to: {
        type: String,
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

    by:{
        type:String,
        required:true
    }





})

mongoose.model("Event", EventScheme)