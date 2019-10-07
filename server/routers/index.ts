import express from "express";
import usersRouter from "./users";
import postRouter from "./posts";

const router = express.Router();

router.use("/users", usersRouter);
router.use("/posts", postRouter);


export default router;