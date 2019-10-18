import express from "express";
import Auth from "../middleware/Auth";
import Owner from "../middleware/Owner";
import CommentController from "../controllers/Comment";


const router = express.Router();

// 新增留言
router.post("/post/:postId", Auth.requireLogin, CommentController.create);

// 刪除留言
router.delete("/:commentId", Auth.requireLogin, Owner.checkComment, CommentController.delete);


export default router;