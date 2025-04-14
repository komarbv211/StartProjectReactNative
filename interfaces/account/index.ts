export interface IUser {
    id: number
    firstName: string
    lastName: string
    email: string
    photo: string
    exp: number
}

export interface ILogin {
    email: string
    password: string
}

export interface IUserCreate {
    firstName: string
    lastName: string
    email: string
    password: string
    image: File | null
}
export interface ILoginResponse {
    token: string
}
export interface IUserInfo {
    email: string;
    name: string;
    roles: string[];
}
//Авторизований користувач у системі
export interface IUserAuth {
    isAdmin: boolean
    isUser: boolean
    isAuth: boolean,
    roles: string[]
}
//Повна інформація про користувача
export interface IUserState {
    user: IUserInfo  | null
    auth: IUserAuth
    token: string | null
}