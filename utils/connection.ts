import mongoose, { Model } from "mongoose";

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { DATABASE_URL } = process.env

// connection function
export const connect = async () => {
    const conn = await mongoose
        .connect(DATABASE_URL as string)
        .catch(err => console.log(err))
    console.log("Mongoose Connection Established")

    const TaskSchema = new mongoose.Schema({
        task: [
            {
                taskName: {type: String, required: true},
                dateDue: {type: Date, required: true},  // fix later when object type is known
                _id: {type: Number, required: true},
                isTextAlert: {type: Boolean, required: true}, // is true when user wants text notification
                desc: String, // description of task
            }
        ]
    });

    const ClassSchema = new mongoose.Schema({
        _id: {type: String, required: true},
        className: {type:String, required: true},
        tasks:{type:[TaskSchema]}
    });

    // OUR USER SCHEMA
    const UserSchema = new mongoose.Schema({
        email: {type: String, required: true},
        pwd: {type: String, required: true},
        fName: {type: String, required: true},
        lName: {type: String, required: true},
        phone: String,
        classes: {type:[ClassSchema]},
    });

    // OUR USER MODEL
    const User = mongoose.models.User || mongoose.model("User", UserSchema)

    return { conn, User }
}
