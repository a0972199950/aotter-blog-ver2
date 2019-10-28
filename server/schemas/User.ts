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
import { IUser } from "../../interfaces/basic";


export interface IUserDocument extends IUser, Document{
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

    const socialMedias: SchemaTypeOpts<any> = {
        facebook: { type: String, default: null },
        twitter: { type: String, default: null },
        instagram: { type: String, default: null }
    }

    const tokens: SchemaTypeOpts<any>[] = [
        { type: String }
    ];

    const blog: SchemaTypeOpts<any> = {
        type: Schema.Types.ObjectId,
        ref: "Blog"
    };

    const friends: SchemaTypeOpts<any>[] = [
        { 
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]

    return { email, password, name, avatar, avatarUrl, birthday, phone, socialMedias, tokens, blog, friends }
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

UserSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "author"
});

UserSchema.methods.generateToken = async function(): Promise<string | void>{
    const user = this;
    const token: string = jwt.sign({ _id: user.id }, process.env.JWT_SECRET_KEY!);

    user.tokens = user.tokens.concat(token);

    try {
        await user.save();
        return token;
    } catch(e){
        return;
    };
};

UserSchema.methods.toJSON = function () {
    const user = this;
    const userPureObj = user.toObject();

    delete userPureObj.password;
    delete userPureObj.tokens;
    delete userPureObj.avatar;

    return userPureObj;
};

UserSchema.pre<IUserDocument>("save", async function(next: HookNextFunction): Promise<void>{
    if(this.password && this.isModified("password")){
        try {
            this.password = await bcrypt.hash(this.password, 8);
            next();
        } catch(e){
            throw new Error("密碼加密失敗");
        }
    }
});



export default UserSchema;