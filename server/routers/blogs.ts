import express from "express";
import BlogsController from "../controllers/Blogs";
import Auth from "../middleware/Auth";
import upload from "../middleware/Multer";


const router = express.Router();

// 讀取自己的部落格資料
router.get("/me", Auth.requireLogin, BlogsController.fetchMe);

// 更新自己的部落格資料
router.patch("/me", Auth.requireLogin, BlogsController.updateMe);

// 上傳自己的部落格封面照片
router.post("/me/cover", Auth.requireLogin, upload.single("cover"), BlogsController.uploadMyCover);

// 讀取全部部落格資料
router.get("/", BlogsController.fetchAll);

// 讀取任一部落格資料
router.get("/:blogId", BlogsController.fetchAny);

// 讀取任一部落格封面照片
router.get("/:blogId/cover", BlogsController.fetchAnyCover);




export default router;