interface IResponseUser {
    email?: string,
    login?: string,
    id?: number
}

export default interface AuthResponse {
    accessToken?: string,
    user?: IResponseUser
}
