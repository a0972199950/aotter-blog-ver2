import {
    Document,
    Schema,
    SchemaDefinition,
    SchemaOptions,
    SchemaTypeOpts
} from "mongoose";

export interface IPost {
    title: string
    content: string
    author: string
}

export interface IPostDocument extends Document{
    [key: string]: any

    // 定義欄位類型
    title: IPost["title"]
    content: IPost["content"]
    author: IPost["author"]
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
        required: true
    }

    return { title, content, author };
};

const createSchemaOptions = (): SchemaOptions => ({
    timestamps: true
});

const PostSchema: Schema = new Schema(createSchemaDefinition(), createSchemaOptions());


export default PostSchema;