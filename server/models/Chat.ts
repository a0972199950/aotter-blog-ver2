import { Model, model } from "mongoose";
import ChatSchema, { IChatDocument } from "../schemas/Chat";


export interface IChatModel extends Model<IChatDocument> {
    // 定義類別方法方法的接口
};

const Chat: IChatModel = model<IChatDocument, IChatModel>("Chatroom", ChatSchema);


export default Chat;
