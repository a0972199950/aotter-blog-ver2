import { Request, Response } from "express";
import User from "../models/User";
import { IUserDocument } from "../schemas/User";


class AuthorsController {
    // 讀取全部部落格作者資料
    public async fetchAll(req: Request, res: Response): Promise<Response | void> {
        try {
            const users: IUserDocument[] | [] = await User
                .find({})
                .populate({ 
                    path: "blog",
                    match: {
                        publish: true
                    }
                })
                .exec();
            const authors = users.map(user => (user.mapUserToAuthor()));

            res.json({ authors });
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }

    // 讀取單一部落格作者資料
    public async fetch(req: Request, res: Response): Promise<Response | void> {
        const userId: string = req.params.userId;

        try {
            const user: IUserDocument | null = await User
                .findById(userId)
                .populate({ path: "blog" })
                .exec();
            if(!user) return res.status(404).json({ message: "找不到作者" });

            const author = user.mapUserToAuthor();

            res.json({ author });
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }
}


export default new AuthorsController()