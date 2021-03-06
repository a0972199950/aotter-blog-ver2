import express from "express";
import path from "path";
import usersRouter from "./users";
import blogsRouter from "./blogs";
import postsRouter from "./posts";
import commentsRouter from "./comments";
import chatsRouter from "./chats";

const router = express.Router();

router.get("/config", (req, res) => {
    res.sendFile(path.join(__dirname, "../../assets/particles.json"));
})
router.use("/users", usersRouter);
router.use("/blogs", blogsRouter);
router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);
router.use("/chats", chatsRouter);


export default router;