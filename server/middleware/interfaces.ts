import { Request } from "express";
import { IUserDocument } from "../schemas/User";
import { IBlogDocument } from "../schemas/Blog";
import { IPostDocument } from "../schemas/Post";


export interface IReqThroughMiddleware extends Request{
    user?: IUserDocument
    post?: IPostDocument
    blog?: IBlogDocument
    file: Express.Multer.File
}