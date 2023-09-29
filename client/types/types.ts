export interface BlogType {
    _id: string,
    image: Buffer
    title: string
    body: string,
    author?: string,
    isFeatured?: boolean
}

export interface userType {
    _id: string,
    name: string,
    email: string,
    blogs: BlogType[]
}

export interface userReducerType {
    user: userType,
    loading: boolean,
    isActive: boolean,
    error: ''
}

export interface blogReducerType {
    blogs: BlogType[],
    loading: boolean,
    created: boolean,
    updated?: boolean,
    error: string
}