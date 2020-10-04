const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = mongoose.model("User")
const bcrypt = require("bcrypt")
const Event = mongoose.model("Event")
const requireLogin=require("../../middleware/requireLogin")




