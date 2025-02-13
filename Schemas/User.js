import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    teamName:{
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    secretPasscode: {
        type: mongoose.Schema.Types.String,
        required: true
    }
}, {timestamps:true});


const User = mongoose.model("User", userSchema)
export default User