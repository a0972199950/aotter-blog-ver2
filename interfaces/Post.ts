export interface IPost {
    [key: string]: any,

    _id: string | null,
    title: string | null,
    content?: string | null,
}

export interface IPosts {
    posts: IPost[]
}