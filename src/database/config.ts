import mongoose, { connection } from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "");
        connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        });
        connection.on("error", (err) => {
            console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
            process.exit();
        });
    } catch (error) {
        console.log("Something went wrong! i don't know what tho");
        console.log(error);
    }
}
