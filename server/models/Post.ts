import { Model, model } from "mongoose";
import PostSchema, { IPostDocument } from "../schemas/Post";


export interface IPostModel extends Model<IPostDocument> {
    // 定義類別方法方法的接口
};

const Post: IPostModel = model<IPostDocument, IPostModel>("Post", PostSchema);


export default Post;