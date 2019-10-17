import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "config";
import { IUserDocument } from "../schemas/User";
import User from "../models/User";


class Auth{
    public static async requireLogin(req: Request, res: Response, next: NextFunction): Promise<Response | void>{
        const token: string | null = Auth._checkTokenExist(req);
        if(!token) return res.status(403).json({ message: "Token不存在" });

        const userId: string | null = Auth._validateToken(token);
        if(!userId) return res.status(403).json({ message: "Token不合法" });

        const user = await Auth._findUserByIdAndToken(userId, token);
        if(!user) return res.status(500).json({ message: "找不到User" });

        req = Object.assign(req, { user });
        next();
    }

    public static async checkAlreadyLogined(req: Request, res: Response, next: NextFunction): Promise<Response | void>{
        const token: string | null = Auth._checkTokenExist(req);
        if(!token) return next();

        const userId: string | null = Auth._validateToken(token);
        if(!userId) return next();

        const user = await Auth._findUserByIdAndToken(userId, token);
        if(!user) return next();

        req = Object.assign(req, { user });
        next();

    }

    private static _checkTokenExist(req: Request): string | null{
        const token: string = req.signedCookies.ab_token;
        return token || null;
    }

    private static _validateToken(token: string): string | null{
        interface Token{
            [key: string]: string,
            _id: string
        }

        try {
            const JWT_SECRET_KEY: string = config.get("JWT_SECRET_KEY");
            const encodedToken: (Token | string) = jwt.verify<Token>(token, JWT_SECRET_KEY);

            if(typeof encodedToken === "string") throw new Error();
            const userId: string = encodedToken._id;
            return userId;

        } catch(e){
            return null;
        }
    }

    private static async _findUserByIdAndToken(userId: string, token: string): Promise<IUserDocument | null>{
        try {
            const user: IUserDocument | null = await User.findOne({
                _id: userId,
                tokens: {
                    $all: [token]
                }
            });

            if(!user) throw new Error();
            return user;
        } catch(e){
            return null;
        }
    }
}


export default Auth;