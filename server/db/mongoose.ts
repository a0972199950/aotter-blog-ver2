import mongoose from "mongoose";
import config from "config";

console.log("database connect");

// TODO: 全域變數整理
const MONGOOSE_DATABASE_URL: string = config.get("MONGOOSE_DATABASE_URL");

mongoose.connect(MONGOOSE_DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})