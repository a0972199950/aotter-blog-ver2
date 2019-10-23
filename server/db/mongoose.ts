import mongoose from "mongoose";

console.log("db connect");
console.log(process.env.MONGOOSE_DATABASE_URL);

mongoose.connect(process.env.MONGOOSE_DATABASE_URL!, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})