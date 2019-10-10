import express from "express";
import BlogsController from "../controllers/Blogs";
import Auth from "../middleware/Auth";
import Owner from "../middleware/Owner";
import upload from "../middleware/Multer";


const router = express.Router();

// 讀取全部部落格資料
router.get("/", BlogsController.fetchAll);

// 讀取單一部落格資料

// 上傳部落格封面照片
router.post("/cover/:blogId", Auth.requireLogin, Owner.checkBlog, upload.single("cover"), BlogsController.uploadCover)

// 讀取部落格封面照片
router.get("/cover/:blogId", BlogsController.fetchCover);


export default router;