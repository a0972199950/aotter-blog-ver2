import { Request, Response } from "express";
import { IReqThroughMiddleware } from "../../interfaces/basic";
import Chat from "../models/Chat";

class ChatsController {
    // 創建雙人聊天室
    public async createRoom (req: IReqThroughMiddleware, res: Response){
        const userId = req.user!._id;
        const liaisonId = req.body.liaisonId;
        
        // 找出是否已經有聊天室
        try {
            const existedChats = await Chat.find({ 
                members: {
                    $all: [userId, liaisonId]
                } 
            })
            
            if(existedChats.length >= 1) {
                return res.json({ chat: existedChats[0] });

            } else {
                const chat = new Chat({
                    members: [userId, liaisonId]
                });

                await chat.save();
                res.json({ chat });
            };
        } catch(e) {
            res.status(500).json({ message: e.message });
        };
    }

    // 獲取單一使用者參與的所有聊天室
    public async fetchRooms (req: IReqThroughMiddleware, res: Response) {
        const userId = req.user!._id;

        try {
            const chats = await Chat.find({ members: userId });
            res.json({ chats })
        } catch(e) {
            res.status(500).json({ message: e.message });
        }
    }

    // 獲取單一聊天室所有訊息
    public async fetchMsgs (req: IReqThroughMiddleware, res: Response) {
        const chatId = req.params.chatId;

        try {
            const chat = await Chat.findById(chatId);
            res.json({ chat });
        } catch(e) {
            res.status(500).json({ message: e.message });
        }
    }

    // 向聊天室發送訊息
    public async postMessage (req: IReqThroughMiddleware, res: Response) {
        const message = req.body.message;
        const userId = req.user!._id;
        const chat = req.chat;

        try {
            chat!.messages.push(message);
            chat!.save();
            res.json({ chat });
        } catch(e) {
            res.status(500).json({ message: e.message });
        }
    }
}

export default new ChatsController();