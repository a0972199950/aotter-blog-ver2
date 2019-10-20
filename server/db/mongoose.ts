import mongoose from "mongoose";

mongoose.connect(process.env.MONGOOSE_DATABASE_URL!, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})