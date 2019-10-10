import { 
    Document, 
    Schema, 
    SchemaDefinition, 
    SchemaOptions, 
    SchemaTypeOpts
} from "mongoose";


export interface IBlog {
    _id: string
    createdAt: Date
    updatedAt: Date
    cover: Buffer
    coverUrl: string
    name: string
    intro: string
    author: string
}

export interface IBlogDocument extends Document {
    // 定義欄位類型
    _id: IBlog["_id"]
    createdAt: IBlog["createdAt"]
    updatedAt: IBlog["updatedAt"]
    cover: IBlog["cover"]
    coverUrl: IBlog["coverUrl"]
    name: IBlog["name"]
    intro: IBlog["intro"]
    author: IBlog["author"]

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

    const author: SchemaTypeOpts<any> = {
        type: String
    };

    return { cover, coverUrl, name, intro, author };
};

const createSchemaOptions = (): SchemaOptions => ({
    timestamps: true
});

const BlogSchema: Schema = new Schema(createSchemaDefinition(), createSchemaOptions());


export default BlogSchema