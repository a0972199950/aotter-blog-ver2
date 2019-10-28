import { Request } from "express";
import { DeltaOperation } from "quill";
import { IUserDocument } from "~/server/schemas/User";
import { IBlogDocument } from "~/server/schemas/Blog";
import { IPostDocument } from "~/server/schemas/Post";
import { ICommentDocument } from "~/server/schemas/Comment";

export interface IReqThroughMiddleware extends Request{
    user?: IUserDocument
    post?: IPostDocument
    blog?: IBlogDocument
    comment?: ICommentDocument
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
    blog: IBlog["_id"] | IBlog
    posts: IPost[]
    comments: IComment[]
    friends: IUser[]
}

export interface IBlog extends IDocument{
    cover: Buffer
    coverUrl: string
    name: string
    intro: string
    publish: boolean
    author: IUser["_id"] | IUser
    posts: IPost[]
}

export interface IPost extends IDocument {
    cover: Buffer
    coverUrl: string
    title: string
    content: DeltaOperation[]
    text: string
    views: number
    publish: boolean
    author: IUser["_id"] | IUser
    belongToBlog: IBlog["_id"] | IBlog
    comments: IComment[]
}

export interface IComment extends IDocument {
    text: string
    author: IUser["_id"] | IUser
    belongToPost: IPost["_id"] | IPost
}



export interface IUserClient extends IDocument {
    email: IUser["email"]
    name: IUser["name"]
    avatarUrl: IUser["avatarUrl"]
    birthday: IUser["birthday"]
    phone: IUser["phone"]
    socialMedias: IUser["socialMedias"]
    blog: string,
    friends: IUserClient[]
}

export interface IBlogClient extends IDocument {
    coverUrl: IBlog["coverUrl"]
    name: IBlog["name"]
    intro: IBlog["intro"]
    publish: boolean
    author: {
        avatarUrl: IUser["avatarUrl"]
        name: IUser["name"]
        socialMedias: IUser["socialMedias"]
    }
}

export interface IPostClient extends IDocument {
    coverUrl: IPost["coverUrl"]
    title: IPost["title"]
    content: IPost["content"]
    text: IPost["text"]
    views: IPost["views"]
    publish: IPost["publish"]
    author: string
    belongToBlog: string
}

export interface ICommentClient extends IDocument {
    text: IComment["text"]
    avatarUrl: IUser["avatarUrl"]
    name: IUser["name"]
}