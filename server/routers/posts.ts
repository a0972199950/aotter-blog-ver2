import express from "express";
import Auth from "../middleware/Auth";
import Owner from "../middleware/Owner";
import upload from "../middleware/Multer";
import PostsController from "../controllers/Posts";


const router = express.Router();

// 新增文章
router.post("/me", Auth.requireLogin, PostsController.create);

// 獲取自己的全部文章
router.get("/me", Auth.requireLogin, PostsController.fetchAll);

// 獲取自己單一文章
router.get("/me/:postId", Auth.requireLogin, Owner.checkPost, PostsController.fetchOne);

// 更新自己單一文章
router.patch("/me/:postId", Auth.requireLogin, Owner.checkPost, PostsController.update);

// 刪除自己單一文章
router.delete("/me/:postId", Auth.requireLogin, Owner.checkPost, PostsController.delete);

// 上傳文章封面照片
router.post("/me/:postId/cover", Auth.requireLogin, Owner.checkPost, upload.single("cover"), PostsController.uploadCover);

// 讀取文章封面照片
router.get("/cover/:postId", PostsController.fetchCover);

// 獲取單一部落格全部文章
router.get("/blog/:blogId", PostsController.fetchAllByBlog);

// 獲取任一文章
router.get("/:postId", PostsController.fetchAny);




export default router;