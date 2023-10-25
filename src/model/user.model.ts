import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
    streamId: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        required: true,
    },
    // episode: {
    //     type: String,
    //     required: true,
    // },
    title: {
        type: String,
        required: true,
    },
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    userDescription: {
        type: String,
        default: "",
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: String,
    verifyToken: String,
    verifyTokenExpiry: Date,
    watchHistory: {
        type: [historySchema],
        default: [],
    },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
