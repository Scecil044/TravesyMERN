import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb running on ${conn.connection.host}`.red.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
