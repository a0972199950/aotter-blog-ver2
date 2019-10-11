import {
    Document,
    Schema,
    SchemaDefinition,
    SchemaOptions,
    SchemaTypeOpts
} from "mongoose";
import { IPost } from "../../interfaces/basic";

export interface IPostDocument extends Document{
    // 定義欄位類型
    _id: IPost["_id"]
    createdAt: IPost["createdAt"]
    updatedAt: IPost["updatedAt"]
    title: IPost["title"]
    content: IPost["content"]
    author: IPost["author"]
    belongToBlog: IPost["belongToBlog"]

    // 定義實例方法接口
}

const createSchemaDefinition = (): SchemaDefinition => {
    const title: SchemaTypeOpts<any> = {
        type: String,
        required: true
    };

    const content: SchemaTypeOpts<any> = {
        type: String
    };

    const author: SchemaTypeOpts<any> = {
        type: String,
        required: true,
        ref: "User"
    };

    const belongToBlog: SchemaTypeOpts<any> = {
        type: String,
        required: true,
        ref: "Blog"
    }

    return { title, content, author, belongToBlog };
};

const createSchemaOptions = (): SchemaOptions => ({
    timestamps: true
});

const PostSchema: Schema = new Schema(createSchemaDefinition(), createSchemaOptions());


export default PostSchema;