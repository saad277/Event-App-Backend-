const express = require("express")
const bodyParser = require("body-parser")
const app = express();
const PORT = process.env.PORT || 4000
const mongoose = require("mongoose")
const { MongoURL } = require("./config/config")

app.use(bodyParser.json())
app.use(express.json())


//Models
require("./models/User")
require("./models/Planner")


//Routes
app.use(require("./routes/Auth/UserAuthRoutes"))
app.use(require("./routes/Auth/PlannerAuthRoutes"))
app.use(require("./routes/Auth/AuthRoutes"))

const db = async () => {


    try {

        mongoose.connect(MongoURL, {

            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true,
        })

        console.log("Connected TO MONGO DB")

    } catch (error) {

        console.log(error)
    }


}

db();




app.get("/", (req, res) => {


    res.json({ email: "asasas" })

})



app.listen(PORT, () => {


    console.log("Server Running on " + PORT)


})