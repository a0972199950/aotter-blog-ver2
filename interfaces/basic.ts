import { Request } from "express";
import { DeltaOperation } from "quill";
import { IUserDocument } from "~/server/schemas/User";
import { IBlogDocument } from "~/server/schemas/Blog";
import { IPostDocument } from "~/server/schemas/Post";

export interface IReqThroughMiddleware extends Request{
    user?: IUserDocument
    post?: IPostDocument
    blog?: IBlogDocument
    file: Express.Multer.File
}

export interface IDocument {
    _id: any
    createdAt: Date
    updatedAt: Date
}

export interface IUser extends IDocument {
    email: string
    password: string
    name: string
    avatar: Buffer
    avatarUrl: string
    birthday: string
    phone: string
    socialMedias: {
        facebook: string
        twitter: string
        instagram: string
    }
    tokens: string[]
    blog: string | IBlog
    posts: IPost[]
}

export interface IBlog extends IDocument{
    cover: Buffer
    coverUrl: string
    name: string
    intro: string
    author: string | IUser
    posts: IPost[]
}

export interface IPost extends IDocument {
    title: string
    content: DeltaOperation[]
    text: string
    views: number
    publish: boolean
    author: string | IUser
    belongToBlog: string | IBlog
}

export interface IAuthor {
    _id: IBlog["_id"]
    avatarUrl: IUser["avatarUrl"]
    blogName: IBlog["name"]
    name: IUser["name"]
    blogIntro: IBlog["intro"]
    socialMedias: IUser["socialMedias"]
}

export interface IUserClient extends IDocument {
    email: IUser["email"]
    name: IUser["name"]
    avatarUrl: IUser["avatarUrl"]
    birthday: IUser["birthday"]
    phone: IUser["phone"]
    socialMedias: IUser["socialMedias"]
    blog: string
}

export interface IBlogClient extends IDocument {
    coverUrl: IBlog["coverUrl"]
    name: IBlog["name"]
    intro: IBlog["intro"]
    author: string
}

export interface IPostClient extends IDocument {
    title: IPost["title"]
    content: IPost["content"]
    text: IPost["text"]
    views: IPost["views"]
    publish: IPost["publish"]
    author: string
    belongToBlog: string
}