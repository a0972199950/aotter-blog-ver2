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

export interface IUser {
    email: string
    password: string
    name?: string
    birthday?: string
    phone?: string
    tokens: string[]
}

export interface IUserDocument extends Document{
    [key: string]: any

    // 定義欄位類型
    email: IUser["email"]
    password: IUser["password"]
    name?: IUser["name"]
    birthday?: IUser["birthday"]
    phone?: IUser["phone"]
    tokens: IUser["tokens"]

    // 定義實例方法接口
    generateToken: () => Promise<string | void>
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
        type: String
    };

    const birthday: SchemaTypeOpts<any> = {
        type: String
    };

    const phone: SchemaTypeOpts<any> = {
        type: String
    };

    const tokens: SchemaTypeOpts<any>[] = [
        { type: String }
    ]

    return { email, password, name, birthday, phone, tokens }
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