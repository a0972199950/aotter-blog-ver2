import express from "express";
import Auth from "../middleware/Auth";
import Owner from "../middleware/Owner";
import PostsController from "../controllers/Posts";


const router = express.Router();

// 新增文章
router.post("/", Auth.requireLogin, PostsController.create);

// 獲取單一用戶全部文章
router.get("/", Auth.requireLogin, PostsController.fetchAll);

// 獲取單一部落格全部文章
router.get("/blog/:blogId", PostsController.fetchAllByBlog);

// 獲取單一文章
router.get("/:postId", PostsController.fetchOne);

// 更新單一文章
router.patch("/:postId", Auth.requireLogin, Owner.checkPost, PostsController.update);

// 刪除單一文章
router.delete("/:postId", Auth.requireLogin, Owner.checkPost, PostsController.delete);


export default router;