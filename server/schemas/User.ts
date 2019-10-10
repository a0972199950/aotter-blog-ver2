import { 
    Document, 
    Schema, 
    SchemaDefinition, 
    SchemaOptions, 
    SchemaTypeOpts, 
    HookNextFunction
} from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { IBlog } from "./Blog";
import { IPost } from "./Post";

export interface IUser {
    _id: string
    createdAt: Date
    updatedAt: Date
    email: string
    password: string
    name: string
    avatar: Buffer
    avatarUrl: string
    birthday: string
    phone: string
    tokens: string[]
    blog: string | IBlog
    posts: IPost[]
}

export interface IAuthor {
    _id: IUser["_id"]
    avatarUrl: IUser["avatarUrl"]
    blogName: IBlog["name"]
    blogIntro: IBlog["intro"]
}

export interface IUserDocument extends Document{
    [key: string]: any

    // 定義欄位類型
    email: IUser["email"]
    password: IUser["password"]
    name: IUser["name"]
    avatar: IUser["avatar"]
    avatarUrl: IUser["avatarUrl"]
    birthday: IUser["birthday"]
    phone: IUser["phone"]
    tokens: IUser["tokens"]
    blog: IUser["blog"]

    // 定義實例方法接口
    generateToken: () => Promise<string | void>
    mapUserToAuthor: () => IAuthor
}

const createSchemaDefinition = (): SchemaDefinition => {
    const email: SchemaTypeOpts<any> = {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value: string): boolean => validator.isEmail(value),
            msg: "email格式不正確"
        }
    };

    const password: SchemaTypeOpts<any> = {
        type: String,
        required: true
    };

    const name: SchemaTypeOpts<any> = {
        type: String,
        default: ""
    };

    const avatar: SchemaTypeOpts<any> = {
        type: Buffer
    };

    const avatarUrl: SchemaTypeOpts<any> = {
        type: String
    }

    const birthday: SchemaTypeOpts<any> = {
        type: String,
        default: ""
    };

    const phone: SchemaTypeOpts<any> = {
        type: String,
        default: ""
    };

    const tokens: SchemaTypeOpts<any>[] = [
        { type: String }
    ];

    const blog: SchemaTypeOpts<any> = {
        type: String,
        ref: "Blog"
    }

    return { email, password, name, avatar, avatarUrl, birthday, phone, tokens, blog }
}

const createSchemaOptions = (): SchemaOptions => ({
    timestamps: true,
    toJSON: { virtuals: true }
})

const UserSchema: Schema = new Schema(createSchemaDefinition(), createSchemaOptions());

UserSchema.virtual("posts", {
    ref: "Post",
    localField: "_id",
    foreignField: "author"
});

UserSchema.methods.generateToken = async function(): Promise<string | void>{
    const user = this;
    // TODO: 整理全域變數
    const JWT_SECRET_KEY: string = "thisismyawesomejwtsecretstring";
    const token: string = jwt.sign({ _id: user.id }, JWT_SECRET_KEY);

    user.tokens = user.tokens.concat(token);

    try {
        await user.save();
        return token;
    } catch(e){
        return;
    }
}

UserSchema.methods.mapUserToAuthor = function(): IAuthor {
    const user = this;

    return { 
        _id: user._id,
        avatarUrl: user.avatarUrl,
        blogName: user.blog.name, 
        blogIntro: user.blog.intro
    };
}

UserSchema.pre<IUserDocument>("save", async function(next: HookNextFunction): Promise<void>{
    if(this.password && this.isModified("password")){
        try {
            this.password = await bcrypt.hash(this.password, 8);
            next();
        } catch(e){
            throw new Error("密碼加密失敗");
        }
    }
})

export default UserSchema;