const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types



const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        default: "https://thumbs.dreamstime.com/b/man-profile-icon-gray-background-172472931.jpg"
    },
    token: {

        type: String,
    },

    events: [
        { eventId: { type: ObjectId, ref: "Event" }, recipientId: { type: ObjectId, ref: "Recipient" } }
    ]



})

mongoose.model("User", userSchema)