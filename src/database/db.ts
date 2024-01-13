import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI || "mongodb://localhost:27017", {
            dbName: "Animetrix",
        });
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        });

        connection.on("error", (err) => {
            console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
            process.exit();
        });
    } catch (error) {
        console.log("Something went wrong!");
        console.log(error);
    }
}
