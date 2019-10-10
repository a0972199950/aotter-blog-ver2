export interface IUser {
    _id: string | null,
    email: string | null,
    avatarUrl: string | null,
    name: string | null,
    birthday: string | null,
    phone: string | null,
    blogName: string | null,
    blogIntro: string | null
}

export interface IAuthor {
    _id: string | null,
    blogName: string | null,
    blogIntro: string | null,
    avatarUrl: string | null,
}
