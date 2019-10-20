import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import Post from "../models/Post";
import Blog from "../models/Blog";
import { IReqThroughMiddleware, IPost } from "../../interfaces/basic";
import { IPostDocument } from "../schemas/Post";


type TAllowedUpdateField = "title" | "content" | "text" | "publish"

class PostsController {
    // 新增文章
    public async create(req: IReqThroughMiddleware, res: Response): Promise<Response | void> {
        const { title, content, text, publish }: IPost = req.body;
        const user = req.user!;

        const userId = user._id;
        const blogId = user.blog;

        const post: IPostDocument = new Post({
            title, content, text, publish,
            author: userId,
            belongToBlog: blogId
        });

        post.coverUrl = `/api/posts/cover/${post._id}?${new Date().valueOf()}`;

        try {
            await post.save();
            res.json({ post });
        } catch(e){
            res.status(500).json({ message: e.message });
        };
    }

    // 獲取自己的全部文章
    public async fetchAll(req: IReqThroughMiddleware, res: Response): Promise<Response | void> {
        const user = req.user;
        if(!user) return res.status(404).json({ message: "找不到User" });

        try {
            await user
                .populate({ 
                    path: "posts",
                    options: {
                        sort: { createdAt: -1 }
                    }
                })
                .execPopulate();

            res.json({ posts: user.posts });
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }

    // 獲取自己單一文章
    public async fetchOne(req: IReqThroughMiddleware, res: Response): Promise<Response | void> {
        const post = req.post;
        res.json({ post });
    }

    // 更新自己單一文章
    public async update(req: IReqThroughMiddleware, res: Response): Promise<Response | void> {
        let post: IPostDocument | undefined = req.post;
        if(!post) return res.status(404).json({ message: "文章不存在" });

        const allowedUpdateFields: TAllowedUpdateField[] = ["title", "content", "text", "publish"];
        post = allowedUpdateFields.reduce((post: IPostDocument, fieldName: string) => {
            const fieldValue = req.body[fieldName]
            if(fieldValue !== undefined){
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

    // 刪除自己單一文章
    public async delete(req: IReqThroughMiddleware, res: Response): Promise<Response | void> {
        const postId = req.params.postId;

        try {
            const result = await Post.findByIdAndDelete(postId);
            res.json({ result });
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }

    // 上傳文章封面照片
    public async uploadCover(req: IReqThroughMiddleware, res: Response): Promise<Response | void> {
        let post = req.post;
        const postId = post!._id;

        const originCover = req.file.buffer;
        const formattedCover = await sharp(originCover).resize(300, 200).jpeg().toBuffer();
        post = Object.assign(post, { 
            cover: formattedCover,
            coverUrl: `/api/posts/cover/${postId}?${new Date().valueOf()}`
        });

        try {
            await post.save();
            res.json({ post });
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }

    // 讀取文章封面照片
    public async fetchCover(req: Request, res: Response): Promise<Response | void> {
        const postId = req.params.postId;

        try {
            const post = await Post
                .findById(postId)
                .select("cover")
                .exec();

            if(!post) return res.status(404).json({ error: "文章不存在" });

            const cover = post.cover || fs.readFileSync(path.join(__dirname, "../../static/image/postCover-default.jpg"));
            res.set("Content-Type", "image/jpeg");
            res.send(cover);
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }

    // 獲取單一部落格全部文章
    public async fetchAllByBlog(req: Request, res: Response): Promise<Response | void> {
        const blogId: string = req.params.blogId;

        try {
            const blog = await Blog
                .findById(blogId)
                .populate({ 
                    path: "posts",
                    match: { publish: true },
                    options: {
                        sort: { createdAt: -1 }
                    }
                })
                .exec();

            if(!blog) return res.status(404).json({ message: "部落格不存在" });
            res.json({ posts: blog.posts });
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }

    // 獲取任一文章
    public async fetchAny(req: Request, res: Response): Promise<Response | void> {
        const postId: string = req.params.postId;

        try {
            const post = await Post
                .findOne({ _id: postId, publish: true })
                .populate({
                    path: "comments",
                    sort: { createdAt: -1 }
                })
                .exec();

            if(!post) return res.status(404).json({ message: "文章不存在" });

            post.views++;
            await post.save();

            const comments = post.comments //...an array filled with values

            const anAsyncFunction = async comment => {
                return await comment.mapClientField()
            }

            const getData = async () => {
                return await Promise.all(comments.map(comment => anAsyncFunction(comment)))
            }

            getData().then(comments => {
                res.json({ post, comments });
            })
            
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }
}


export default new PostsController();