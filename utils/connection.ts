//IMPORT MONGOOSE
import mongoose, { Model } from "mongoose";

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { DATABASE_URL } = process.env

// connection function
export const connect = async () => {
    const conn = await mongoose
        .connect(DATABASE_URL as string)
        .catch(err => console.log(err))
    console.log("Mongoose Connection Established")

    // OUR USER SCHEMA
    const UserSchema = new mongoose.Schema({
        email: {type: String, required: true},
        pwd: {type: String, required: true},
        fName: {type: String, required: true},
        lName: {type: String, required: true},
        phone: String,
    });

    // OUR USER MODEL
    const User = mongoose.models.User || mongoose.model("User", UserSchema)

    return { conn, User }
}
