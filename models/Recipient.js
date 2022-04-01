const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const RecipientSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventId: {
    type: ObjectId,
    ref: "Event",
  },

  userName: {
    type: String,
    required: true,
  },

  joinedDate: {
    type: Date,
    required: true,
  },

  userId: {
    type: ObjectId,
    ref: "User",
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
});

mongoose.model("Recipient", RecipientSchema);
