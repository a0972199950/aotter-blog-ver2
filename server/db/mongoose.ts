import mongoose from "mongoose";

console.log("database connect");

// TODO: 全域變數整理
const MONGOOSE_DATABASE_URL: string = "mongodb://127.0.0.1:27017/aotter-blog-ver2";

mongoose.connect(MONGOOSE_DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})