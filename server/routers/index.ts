import express from "express";
import path from "path";
import usersRouter from "./users";
import authorsRouter from "./authors";
import blogsRouter from "./blogs";
import postsRouter from "./posts";

const router = express.Router();

router.get("/config", (req, res) => {
    res.sendFile(path.join(__dirname, "../../assets/particles.json"));
})
router.use("/users", usersRouter);
router.use("/authors", authorsRouter);
router.use("/blogs", blogsRouter);
router.use("/posts", postsRouter);


export default router;