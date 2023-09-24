export interface BlogType {
    _id: string,
    image: string
    title: string
    body: string,
    isFeatured: boolean
}

export interface userType {
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