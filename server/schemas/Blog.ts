import { 
    Document, 
    Schema, 
    SchemaDefinition, 
    SchemaOptions, 
    SchemaTypeOpts
} from "mongoose";
import { IBlog, IBlogClient } from "../../interfaces/basic";


export interface IBlogDocument extends IBlog, Document {
    // 定義實例方法接口
}

const createSchemaDefinition = (): SchemaDefinition => {
    const cover: SchemaTypeOpts<any> = {
        type: Buffer
    };

    const coverUrl: SchemaTypeOpts<any> = {
        type: String
    };

    const name: SchemaTypeOpts<any> = {
        type: String,
        required: true
    };

    const intro: SchemaTypeOpts<any> = {
        type: String,
        default: "大家好，歡迎光臨我的部落格!!"
    };

    const publish: SchemaTypeOpts<any> = {
        type: Boolean,
        default: false
    }

    const author: SchemaTypeOpts<any> = {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    };

    return { cover, coverUrl, name, intro, publish, author };
};

const createSchemaOptions = (): SchemaOptions => ({
    timestamps: true
});

const BlogSchema: Schema = new Schema(createSchemaDefinition(), createSchemaOptions());

BlogSchema.virtual("posts", {
    ref: "Post",
    localField: "_id",
    foreignField: "belongToBlog"
});

BlogSchema.methods.toJSON = function () {
    const blog = this;
    const blogPureObj = blog.toObject();

    delete blogPureObj.cover;

    return blogPureObj;
};



export default BlogSchema