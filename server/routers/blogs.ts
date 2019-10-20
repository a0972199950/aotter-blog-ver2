import express from "express";
import BlogsController from "../controllers/Blogs";
import Auth from "../middleware/Auth";
import upload from "../middleware/Multer";
import Owner from "../middleware/Owner";


const router = express.Router();

// 讀取全部部落格資料
router.get("/", BlogsController.fetchAll);

// 更新單一部落格資料
router.patch("/", Auth.requireLogin, BlogsController.update);

// 讀取自己的部落格資料
router.get("/me", Auth.requireLogin, BlogsController.fetchMe);

// 上傳部落格封面照片
router.post("/cover", Auth.requireLogin, upload.single("cover"), BlogsController.uploadCover);

// 讀取部落格封面照片
router.get("/cover/:blogId", BlogsController.fetchCover);

// 讀取任一部落格資料
router.get("/:blogId", BlogsController.fetch);


export default router;