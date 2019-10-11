import { Response, NextFunction } from "express";
import { IReqThroughMiddleware } from "../../interfaces/basic";
import Post from "../models/Post";
import Blog from "../models/Blog";
import { IPostDocument } from "../schemas/Post";
import { IBlogDocument } from "../schemas/Blog";


class Owner{
    public static async checkPost(req: IReqThroughMiddleware, res: Response, next: NextFunction): Promise<Response | void> {
        const postId: string = req.params.postId;
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

    public static async checkBlog(req: IReqThroughMiddleware, res: Response, next: NextFunction): Promise<Response | void> {
        const blogId: string = req.params.blogId;
        const user = req.user;
        if(!user) return res.status(403).json({ message: "請先登入" });

        try {
            const blog: IBlogDocument | null = await Blog.findById(blogId);
            if(!blog) return res.status(404).json({ message: "部落格不存在" });

            if(blog.author !== user.id) return res.status(403).json({ message: "只有作者可以修改部落格" });

            req = Object.assign(req, { blog });
            next();
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }
}


export default Owner;