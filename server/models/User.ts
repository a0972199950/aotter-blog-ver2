import { Model, model } from "mongoose";
import bcrypt from "bcryptjs";
import UserSchema, { IUserDocument } from "../schemas/User";

export interface Credentials {
    email: string,
    password: string
}

export interface IUserModel extends Model<IUserDocument>{
    // 定義類別方法方法的接口
    findByCredentials: (credentials: Credentials) => Promise<IUserDocument | null>
}

UserSchema.statics.findByCredentials = async function({ email, password }: Credentials): Promise<IUserDocument | null>{
    try {
        const user: IUserDocument = await this.findOne({ email });
        if(!user) return null;

        const isPasswordValid: boolean = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) return null;

        return user;
    } catch(e){
        return null;
    }
}

const User: IUserModel = model<IUserDocument, IUserModel>("User", UserSchema);


export default User;