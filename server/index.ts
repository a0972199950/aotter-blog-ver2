import express from "express";
import cookieParser from "cookie-parser";
import router from "./routers/index";

import "./db/mongoose";

const app = express()

app.use(express.json());
app.use("/static", express.static("static"));

app.use(cookieParser(process.env.COOKIE_SIGN_KEY));
app.use("/", router);


export default app;