export interface UserFormInterface {
    username: string;
    password: string;
}

export interface UserInterface {
    username: string;
    roles: string[];
    exp: number;
}
