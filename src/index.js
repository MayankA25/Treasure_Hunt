import express from "express"
import router from "../routes/auth.js";
import mongoose from "mongoose";
import session from "express-session"
import MongoStore from "connect-mongo";

mongoose.connect("mongodb://localhost:27017/Treasure_Hunt").then(()=>{
    console.log("Connected To Mongo DB")
}).catch((e)=>{
    console.log(e);
})
const app = express();
app.use(express.json())

app.use(session({
    secret: "thisisthesecretofthetreasurehunt",
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 60000 * 5
    },
    store:MongoStore.create({
        client: mongoose.connection.getClient()
    })
}))
app.use("/api/auth", router)

app.listen(5000, ()=>{
    console.log("Listening On The PORT: 5000")
})