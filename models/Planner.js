const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types



const plannerSchema = new mongoose.Schema({

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
    organization: {

        type: String,
        required:true
    },
    type: {

        type: "String",
        required:true
    }


})

mongoose.model("Planner", plannerSchema)