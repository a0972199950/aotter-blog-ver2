import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import Blog from "../models/Blog";
import { IBlogDocument } from "../schemas/Blog";
import { IReqThroughMiddleware } from "../../interfaces/basic";


class BlogsController {
    // 讀取全部部落格資料
    public async fetchAll(req: Request, res: Response): Promise<Response | void> {
        try {
            const blogs: IBlogDocument[] | [] = await Blog.find({});
            res.json({ blogs });
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }

    // 更新單一部落格資料
    public async update(req: IReqThroughMiddleware, res: Response): Promise<Response | void> {
        const user = req.user;
        if(!user) return res.status(403).json({ message: "請先登入" });

        const blogId = user.blog;
        const updates = {
            name: req.body.blogName,
            intro: req.body.blogIntro
        }

        try {
            const blog = await Blog.findByIdAndUpdate(blogId, updates, { new: true });
            res.json({ blog });
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }

    // 讀取單一部落格資料
    public async fetch(req: Request, res: Response): Promise<Response | void> {
        const blogId: string = req.params.blogId;

        try {
            const blog: IBlogDocument | null = await Blog.findById(blogId);
            if(!blog) return res.status(404).json({ message: "找不到部落格" });
            res.json({ blog });
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }

    // 上傳部落格封面照片
    public async uploadCover(req: IReqThroughMiddleware, res: Response): Promise<Response | void> {
        const user = req.user;
        if(!user) return res.status(403).json({ message: "請先登入" });

        const blogId = user.blog;
        let blog = await Blog.findById(blogId);
        if(!blog) return res.status(404).json({ message: "部落格不存在" });

        const originCover = req.file.buffer;
        const formattedCover = await sharp(originCover).resize(1200, 500).jpeg().toBuffer();
        blog = Object.assign(blog, { 
            cover: formattedCover,
            coverUrl: `/api/blogs/cover/${blogId}?${new Date().valueOf()}`
        });

        try {
            await blog.save();
            res.json({ blog });
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }

    // 讀取部落格封面照片
    public async fetchCover(req: Request, res: Response): Promise<Response | void> {
        const blogId: string = req.params.blogId;

        try {
            const blog = await Blog
                .findById(blogId)
                .select("cover")
                .exec();

            if(!blog) return res.status(404).json({ error: "部落格封面照片不存在" });

            const cover = blog.cover || fs.readFileSync(path.join(__dirname, "../../static/image/blogCover-default.jpg"));
            res.set("Content-Type", "image/jpeg");
            res.send(cover);
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }
}


export default new BlogsController();