import { Response, NextFunction } from "express";
import { IReqThroughMiddleware } from "../../interfaces/basic";
import Post from "../models/Post";
import Blog from "../models/Blog";
import Comment from "../models/Comment";
import { IPostDocument } from "../schemas/Post";
import { IBlogDocument } from "../schemas/Blog";
import { ICommentDocument } from "../schemas/Comment";


class Owner {
    public static async checkPost(req: IReqThroughMiddleware, res: Response, next: NextFunction): Promise<Response | void> {
        const postId: string = req.params.postId;
        const userId = req.user!._id;

        try {
            const post: IPostDocument | null = await Post.findById(postId);
            if(!post) return res.status(404).json({ message: "文章不存在" });

            if(post.author.toString() !== userId.toString()) return res.status(403).json({ message: "只有作者可以修改/刪除文章" });

            req = Object.assign(req, { post });
            next();
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }

    public static async checkBlog(req: IReqThroughMiddleware, res: Response, next: NextFunction): Promise<Response | void> {
        const blogId: string = req.params.blogId;
        const userId = req.user!._id;

        try {
            const blog: IBlogDocument | null = await Blog.findById(blogId);
            if(!blog) return res.status(404).json({ message: "部落格不存在" });

            if(blog.author.toString() !== userId.toString()) return res.status(403).json({ message: "只有作者可以修改部落格" });

            req = Object.assign(req, { blog });
            next();
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }

    public static async checkComment(req: IReqThroughMiddleware, res: Response, next: NextFunction): Promise<Response | void> {
        const commentId = req.params.commentId;
        const userId = req.user!._id;

        try {
            const comment: ICommentDocument | null = await Comment.findById(commentId);
            if(!comment) return res.status(404).json({ message: "留言不存在" });

            if(comment.author.toString() !== userId.toString()) return res.status(403).json({ message: "只有留言者可以刪除留言" });

            req = Object.assign(req, { comment });
            next();
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }
}


export default Owner;