import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import User, { Credentials } from "../models/User";
import Blog from "../models/Blog";
import { IUserDocument } from "../schemas/User";
import { IReqThroughMiddleware } from "../../interfaces/basic";

type TAllowedUpdateField = "password" | "name" | "birthday" | "phone" | "socialMedias";

class UsersController{
    // 註冊
    public async signup(req: Request, res: Response): Promise<void> {
        try {
            const { email, password, blogName } = req.body;
            const user = new User({ email, password });
            const blog = new Blog({ name: blogName, author: user._id });

            user.avatarUrl = `/api/users/${user._id}/avatar?${new Date().valueOf()}`;
            user.blog = blog._id;
            blog.coverUrl = `/api/blogs/${blog._id}/cover?${new Date().valueOf()}`;

            const token = await user.generateToken();
            await blog.save();

            res
                .cookie("ab_token", token, {
                    maxAge: 86400000,
                    signed: true
                })
                .json({ user, blog });
        } catch(e){
            res.status(400).json({ message: e.message });
        }
    }

    // 登入
    public async login(req: IReqThroughMiddleware, res: Response): Promise<Response | void> {
        try {
            const { email, password }: Credentials = req.body;

            const user = await User.findByCredentials({ email, password });
            if(!user) return res.status(404).json({ message: "帳號或密碼錯誤" });

            // 確認req.body的user資料是否與cookie一致，
            // 若一致則不繼續往下執行
            const userFromCookie = req.user;
            if(userFromCookie){
                const userFromCookieId = userFromCookie.id;
                if(userFromCookieId === user.id) return res.json({ user: userFromCookie });
            }

            const token = await user.generateToken();
            res
                .cookie("ab_token", token, {
                    maxAge: 86400000,
                    signed: true
                })
                .json({ user })
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }

    // 讀取我的資料
    public profile(req: IReqThroughMiddleware, res: Response): void {
        const user = req.user;
        res.json({ user });
    }

    // 更新我的資料
    public async update(req: IReqThroughMiddleware, res: Response): Promise<Response | void> {
        let user: IUserDocument | undefined = req.user;
        if(!user) return res.status(404).json({ message: "找不到User" });

        const allowedUpdateFields: TAllowedUpdateField[] = ["password", "name", "birthday", "phone", "socialMedias"];
        user = allowedUpdateFields.reduce((user: IUserDocument, fieldName: string) => {
            let fieldValue = req.body[fieldName];
            if(fieldValue){
                user = Object.assign(user, { [fieldName]: fieldValue });
            };

            return user;
        }, user);

        try {
            await user.save();
            res.json({ user });
        } catch(e){
            res.status(500).json({ message: e.message });
        };
    }

    // 上傳頭像
    public async uploadAvatar(req: IReqThroughMiddleware, res: Response): Promise<Response | void> {
        let user: IUserDocument | undefined = req.user;
        if(!user) return res.status(404).json({ message: "找不到User" });

        const originAvatar = req.file.buffer;
        const formattedAvatar = await sharp(originAvatar).resize(250, 250).jpeg().toBuffer();
        user = Object.assign(user, { 
            avatar: formattedAvatar,
            avatarUrl: `/api/users/${user._id}/avatar?${new Date().valueOf()}`
        });

        try {
            await user.save();
            res.json({ user });
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }

    // 讀取頭像
    public async fetchAvatar(req: Request, res: Response): Promise<Response | void> {
        const userId: string = req.params.userId;

        try {
            const user = await User
                .findById(userId)
                .select("avatar")
                .exec();

            if(!user) return res.status(404).json({ error: "找不到User" });

            const avatar = user.avatar || fs.readFileSync(path.join(__dirname, "../../static/image/avatar-default.jpg"));
            res.set("Content-Type", "image/jpeg");
            res.send(avatar);
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }

    // 登出目前裝置
    public async logout(req: IReqThroughMiddleware, res: Response): Promise<Response | void> {
        const token: string = req.signedCookies.ab_token;
        const user: IUserDocument | undefined = req.user;
        if(!user) return res.status(404).json({ message: "請先登入" });

        user.tokens = user.tokens.filter(eachToken=> eachToken !== token);

        try {
            await user.save();
            res
                .clearCookie("ab_token")
                .json({ message: "登出成功" });
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }

    // 登出所有裝置
    public async logoutAll(req: IReqThroughMiddleware, res: Response): Promise<Response | void> {
        const user: IUserDocument | undefined = req.user;
        if(!user) return res.status(404).json({ message: "請先登入" });

        user.tokens = [];

        try {
            await user.save();
            res
                .clearCookie("ab_token")
                .json({ message: "登出成功" });
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }

}


export default new UsersController();