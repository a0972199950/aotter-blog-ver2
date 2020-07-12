import express from "express";
import ChatsController from "../controllers/Chats";
import Auth from "../middleware/Auth";
import Owner from "../middleware/Owner";


const router = express.Router();


// 創建雙人聊天室
router.post("/createRoom", Auth.requireLogin, ChatsController.createRoom);

// 獲取單一使用者參與的所有聊天室
router.get("/", Auth.requireLogin, ChatsController.fetchRooms);

// 獲取單一聊天室所有訊息
router.get("/:chatId", Auth.requireLogin, ChatsController.fetchMsgs);

// 向聊天室發送訊息
router.post("/:chatId/message", Auth.requireLogin, Owner.checkChat, ChatsController.postMessage);


export default router;