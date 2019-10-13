import {
    Document,
    Schema,
    SchemaDefinition,
    SchemaOptions,
    SchemaTypeOpts
} from "mongoose";
import { IPost } from "../../interfaces/basic";

export interface IPostDocument extends IPost, Document{
    // 定義實例方法接口
}

const createSchemaDefinition = (): SchemaDefinition => {
    const title: SchemaTypeOpts<any> = {
        type: String,
        required: true
    };

    const content: SchemaTypeOpts<any> = {
        type: Array
    };

    const text: SchemaTypeOpts<any> = {
        type: String
    };

    const views: SchemaTypeOpts<any> = {
        type: Number,
        default: 0
    }

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

    return { title, content, text, views, author, belongToBlog };
};

const createSchemaOptions = (): SchemaOptions => ({
    timestamps: true
});

const PostSchema: Schema = new Schema(createSchemaDefinition(), createSchemaOptions());


export default PostSchema;