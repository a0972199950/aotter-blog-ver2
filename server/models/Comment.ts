import { Model, model } from "mongoose";
import CommentSchema, { ICommentDocument } from "../schemas/Comment";


export interface ICommentModel extends Model<ICommentDocument> {
	// 定義類別方法方法的接口
};

const Comment: ICommentModel = model<ICommentDocument, ICommentModel>("Comment", CommentSchema);


export default Comment;