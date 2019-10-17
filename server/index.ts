import express from "express";
import cookieParser from "cookie-parser";
import config from "config";
import router from "./routers/index";

import "./db/mongoose";

const app = express()

app.use(express.json());
app.use("/static", express.static("static"));

const COOKIE_SIGN_KEY: string = config.get("COOKIE_SIGN_KEY");
app.use(cookieParser(COOKIE_SIGN_KEY));
app.use("/", router);


export default app;