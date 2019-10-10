import express from "express";
import usersRouter from "./users";
import authorsRouter from "./authors";
import blogsRouter from "./blogs";
import postsRouter from "./posts";

const router = express.Router();

router.use("/users", usersRouter);
router.use("/authors", authorsRouter);
router.use("/blogs", blogsRouter);
router.use("/posts", postsRouter);


export default router;