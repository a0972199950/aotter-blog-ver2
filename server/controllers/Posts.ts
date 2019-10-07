import { Request, Response } from "express";
import Post from "../models/Post";
import User from "../models/User"
import { IReqThroughMiddleware } from "../middleware/interfaces";
import { IPostDocument } from "../schemas/Post";

interface IPost {
    title: string
    content?: string
}

type TAllowedUpdateField = "title" | "content"

class PostsController {
    // 新增文章
    public async create(req: IReqThroughMiddleware, res: Response): Promise<Response | void> {
        const { title, content }: IPost = req.body;

        if(!req.user) return res.status(403).json({ message: "請先登入" });
        const userId: string = req.user.id;

        const post: IPostDocument = new Post({
            title, content,
            author: userId
        });

        try {
            await post.save();
            res.json({ post });
        } catch(e){
            res.status(500).json({ message: e.message });
        };
    }

    // 獲取單一文章
    public async fetchOne(req: Request, res: Response): Promise<Response | void> {
        const postId: string = req.params.postId;

        try {
            const post = await Post.findById(postId);
            if(!post) return res.status(404).json({ message: "文章不存在" });

            res.json({ post });
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }

    // 獲取單一用戶全部文章
    public async fetchAll(req: Request, res: Response): Promise<Response | void> {
        const userId: string = req.params.userId;

        try {
            const user = await User
                .findById(userId)
                .populate({ path: "posts" })
                .exec();

            if(!user) return res.status(404).json({ message: "User不存在" });
            res.json({ posts: user.posts });
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }

    // 更新單一文章
    public async update(req: IReqThroughMiddleware, res: Response): Promise<Response | void> {
        let post = req.post;
        if(!post) return res.status(404).json({ message: "文章不存在" });

        const allowedUpdateFields: TAllowedUpdateField[] = ["title", "content"];
        post = allowedUpdateFields.reduce((post: IPostDocument, fieldName: string) => {
            const fieldValue = req.body[fieldName]
            if(fieldValue){
                post = Object.assign(post, { [fieldName]: fieldValue });
            };

            return post;
        }, post);

        try {
            await post.save();
            res.json({ post });
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }

    // 刪除單一文章
    public async delete(req: IReqThroughMiddleware, res: Response): Promise<Response | void> {
        const postId = req.params.postId;

        try {
            const result = await Post.findByIdAndDelete(postId);
            res.json({ result });
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }
}


export default new PostsController();