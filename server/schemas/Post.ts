import {
    Document,
    Schema,
    SchemaDefinition,
    SchemaOptions,
    SchemaTypeOpts
} from "mongoose";
import { IPost } from "../../interfaces/basic";

export interface IPostDocument extends IPost, Document {
    // 定義實例方法接口
}

const createSchemaDefinition = (): SchemaDefinition => {
    const cover: SchemaTypeOpts<any> = {
        type: Buffer
    };

    const coverUrl: SchemaTypeOpts<any> = {
        type: String
    };

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
    };

    const publish: SchemaTypeOpts<any> = {
        type: Boolean,
        default: false
    };

    const author: SchemaTypeOpts<any> = {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    };

    const belongToBlog: SchemaTypeOpts<any> = {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Blog"
    }

    return { cover, coverUrl, title, content, text, views, publish, author, belongToBlog };
};

const createSchemaOptions = (): SchemaOptions => ({
    timestamps: true,
    toJSON: { virtuals: true }
});

const PostSchema: Schema = new Schema(createSchemaDefinition(), createSchemaOptions());

PostSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "belongToPost"
});

PostSchema.methods.toJSON = function () {
    const post = this;
    const postPureObj = post.toObject();

    delete postPureObj.cover;

    return postPureObj;
};


export default PostSchema;