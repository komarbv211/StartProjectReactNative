import { jwtDecode } from "jwt-decode";
import {IUserInfo} from "@/interfaces/account";
export const jwtParse = (token: string): IUserInfo | null => {
    try {
        const data = jwtDecode<IUserInfo>(token);
        return {
            name: data['name'],
            email: data['email'],
            roles: data['roles'] || [],
        }
    }
    catch (error) {
        console.log("Помилка при парсингу токена:", error);
        return null;
    }
}