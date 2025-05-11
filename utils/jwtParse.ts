import { jwtDecode } from "jwt-decode";
import { IUser } from "@/interfaces/account";

export const jwtParse = (token: string | null): IUser | null => {
    if (!token) return null;

    const decoded: any = jwtDecode(token);

    return {
        email: decoded.email,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        image: decoded.image,
        roles: decoded.roles,
        exp: decoded.exp
    };
};
