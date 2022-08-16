export interface UserFormInterface {
    username: string;
    password: string;
}

export interface UserInterface {
    jti: string;
    sub: string;
    authorities: string[];
    iat: number;
    exp: number;
}
