import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/restoo";
    console.log("Attempting to connect to MongoDB...");
    console.log("MongoDB URI:", mongoURI);

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    console.log(`Port: ${conn.connection.port}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    console.error("Please check your MongoDB connection and try again.");
    console.error(
      "Make sure MongoDB is running and the connection string is correct."
    );
    process.exit(1);
  }
};

export default connectDB;
