import { Request, Response, NextFunction } from "express";
import { IReqThroughMiddleware } from "./interfaces";
import Post from "../models/Post";
import { IPostDocument } from "../schemas/Post";


class Owner{
    public static async checkPost(req: IReqThroughMiddleware, res: Response, next: NextFunction): Promise<Response | void> {
        const postId = req.params.postId;
        const user = req.user;
        if(!user) return res.status(403).json({ message: "請先登入" });

        try {
            const post: IPostDocument | null = await Post.findById(postId);

            if(!post) return res.status(404).json({ message: "文章不存在" });
            if(post.author !== user.id) return res.status(403).json({ message: "只有作者可以修改/刪除文章" });

            req = Object.assign(req, { post });
            next();
        } catch(e){
            res.status(500).json({ message: e.message });
        }
        
    }
}


export default Owner;