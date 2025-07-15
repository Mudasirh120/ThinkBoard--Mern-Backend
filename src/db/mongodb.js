import mongoose from "mongoose";
import { config } from "dotenv";
config({
  debug: true,
  override: true,
});
import DB_NAME from "../constants.js";
const connectDd = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log("MongoDb Connected Successfully");
  } catch (error) {
    console.log("Unable to connect to mongodb", error);
    process.exit(1); // exit with failure
  }
};
export default connectDd;
