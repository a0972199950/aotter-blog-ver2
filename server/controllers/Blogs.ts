import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import Blog from "../models/Blog";
import { IBlogDocument } from "../schemas/Blog";
import { IReqThroughMiddleware } from "../../interfaces/basic";


class BlogsController {
    // 讀取自己的部落格資料
    public async fetchMe(req: IReqThroughMiddleware, res: Response): Promise<Response | void> {
        const blogId = req.user!.blog;

        try {
            const blog = await Blog
                .findById(blogId)
                .populate({
                    path: "author",
                    select: "avatarUrl name socialMedias"
                })
                .exec();

            res.json({ blog });
        } catch(e){
            res.status(500).json({ message: e.message });
        };
    }

    // 更新自己的部落格資料
    public async updateMe(req: IReqThroughMiddleware, res: Response): Promise<Response | void> {
        const blogId = req.user!.blog;
        const updates = {
            name: req.body.blogName,
            intro: req.body.blogIntro,
            publish: req.body.blogPublish
        }

        try {
            const blog = await Blog.findByIdAndUpdate(blogId, updates, { new: true });
            res.json({ blog });
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }

    // 上傳自己的部落格封面照片
    public async uploadMyCover(req: IReqThroughMiddleware, res: Response): Promise<Response | void> {
        const blogId = req.user!.blog;
        
        try {
            let blog = await Blog.findById(blogId);
            if(!blog) return res.status(404).json({ message: "部落格不存在" });

            const originCover = req.file.buffer;
            const formattedCover = await sharp(originCover).resize(1200, 500).jpeg().toBuffer();
            blog = Object.assign(blog, { 
                cover: formattedCover,
                coverUrl: `/api/blogs/${blogId}/cover?${new Date().valueOf()}`
            });
        
            await blog.save();
            res.json({ blog });
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }

    // 讀取全部部落格資料
    public async fetchAll(req: Request, res: Response): Promise<Response | void> {
        try {
            const blogs: IBlogDocument[] | [] = await Blog
                .find({ publish: true })
                .populate({
                    path: "author",
                    select: "avatarUrl name socialMedias"
                })
                .exec();

            res.json({ blogs });
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }

    // 讀取任一部落格資料
    public async fetchAny(req: Request, res: Response): Promise<Response | void> {
        const blogId = req.params.blogId;

        try {
            const blog: IBlogDocument | null = await Blog
                .findOne({ _id: blogId, publish: true })
                .populate({
                    path: "author",
                    select: "avatarUrl name socialMedias"
                })
                .exec();
            if(!blog) return res.status(404).json({ message: "找不到部落格" });

            res.json({ blog });
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }

    // 讀取任一部落格封面照片
    public async fetchAnyCover(req: Request, res: Response): Promise<Response | void> {
        const blogId: string = req.params.blogId;

        try {
            const blog = await Blog
                .findById(blogId)
                .select("cover")
                .exec();
            if(!blog) return res.status(404).json({ error: "部落格不存在" });

            const cover = blog.cover || fs.readFileSync(path.join(__dirname, "../../static/image/blogCover-default.jpg"));
            res.set("Content-Type", "image/jpeg");
            res.send(cover);
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }
}


export default new BlogsController();