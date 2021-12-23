export type Session = {
    isAuth?: boolean;
    token: string;
    expire_in: number;
    is_active?:boolean;
    role?:string;
}