import { Model, model } from "mongoose";
import BlogSchema, { IBlogDocument } from "../schemas/Blog";


export interface IBlogModel extends Model<IBlogDocument> {
    // 定義類別方法方法的接口
};

const Blog: IBlogModel = model<IBlogDocument, IBlogModel>("Blog", BlogSchema);


export default Blog;