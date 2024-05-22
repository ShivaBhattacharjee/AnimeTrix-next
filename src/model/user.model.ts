import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
    streamId: {
        type: String,
    },
    animeId: {
        type: String,
    },
    image: {
        type: String,
    },
    coverImage: {
        type: String,
    },
    episode: {
        type: String,
    },
    title: {
        type: String,
    },
});
const bookmarkSchema = new mongoose.Schema({
    animeId: {
        type: Number,
        unique: true,
    },
    image: {
        type: String,
    },
    title: {
        type: String,
        unique: true,
    },
});
const waifuChat = new mongoose.Schema({
    waifuName: {
        type: String,
    },
    userMessage: {
        type: String,
    },
    waifuResponse: {
        type: String,
    },
    timestamp: { type: Date, default: Date.now },
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
        default: "Hello there! I'm using AnimeTrix.",
    },
    waifuChat: {
        type: [waifuChat],
        default: [],
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: String,
    verifyToken: String,
    verifyTokenExpiry: Date,
    watchHistory: {
        type: [historySchema],
        default: [],
    },
    bookmarks: {
        type: [bookmarkSchema],
        default: [],
    },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
