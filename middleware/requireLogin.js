const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { JWTKey } = require("../config/config");
const User = mongoose.model("User");
const Planner = mongoose.model("Planner");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "you must be logged in" });
  }

  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, JWTKey, (error, payload) => {
    if (error) {
      return res.status(401).json({ error: "you must be logged in" });
    }

    const { _id } = payload;

    User.findById(_id).then((savedUser) => {
      if (savedUser) {
        req.user = savedUser;
        next();
      } else {
        Planner.findById(_id).then((savedPlanner) => {
          (req.user = savedPlanner), next();
        });
      }
    });
  });
};
