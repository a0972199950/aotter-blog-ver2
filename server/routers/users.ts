import express, { Request, Response } from "express";
import UsersController from "../controllers/Users";
import Auth from "../middleware/Auth";
import upload from "../middleware/Multer";

const router = express.Router();

// 註冊
router.post("/", UsersController.signup);

// 登入
router.post("/login", Auth.checkAlreadyLogined, UsersController.login);

// 讀取我的資料
router.get("/profile", Auth.requireLogin, UsersController.profile);

// 更新我的資料
router.patch("/profile", Auth.requireLogin, UsersController.update);

// 上傳頭像
router.post("/avatar", Auth.requireLogin, upload.single("avatar"), UsersController.uploadAvatar);

// 讀取頭像
router.get("/avatar/:userId", UsersController.fetchAvatar);

// 登出目前裝置
router.get("/logout", Auth.requireLogin, UsersController.logout);

// 登出所有裝置
router.get("/logout/all", Auth.requireLogin, UsersController.logoutAll);


// 測試
router.get("/test", (req: Request, res: Response) => {
    res.send("users路由作用正常")
})

export default router;