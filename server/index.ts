import express from "express";
import cookieParser from "cookie-parser";
import router from "./routers/index";

import "./db/mongoose";

const app = express()

app.use(express.json());
app.use("/static", express.static("static"));

// TODO: 整理全域變數
const COOKIE_SIGN_KEY: string = "COOKIE_SIGN_KEY";
app.use(cookieParser(COOKIE_SIGN_KEY));
app.use("/", router);


export default app;