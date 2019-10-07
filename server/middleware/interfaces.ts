import { Request } from "express";
import { IUserDocument } from "../schemas/User";
import { IPostDocument } from "../schemas/Post";


export interface IReqThroughMiddleware extends Request{
    user?: IUserDocument
    post?: IPostDocument
}