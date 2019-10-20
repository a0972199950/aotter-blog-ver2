import express from "express";
import Auth from "../middleware/Auth";
import Owner from "../middleware/Owner";
import CommentsController from "../controllers/Comments";


const router = express.Router();

// 新增留言
router.post("/post/:postId", Auth.requireLogin, CommentsController.create);

// 刪除留言
router.delete("/:commentId", Auth.requireLogin, Owner.checkComment, CommentsController.delete);


export default router;