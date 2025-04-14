import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from "..";
import { jwtParse } from "@/utils/jwtParse";
import { ACCESS_KEY } from '@/constants/Urls';
import * as SecureStore from 'expo-secure-store';
import { IUserAuth, IUserInfo, IUserState } from "@/interfaces/account";

// Отримання користувача з токена
const getUserFromToken = (token: string | null): IUserInfo | null => {
    if (!token) return null;
    const user = jwtParse(token);
    if (user && !Array.isArray(user.roles)) user.roles = [];
    return user;
};

// Генерація auth-об'єкта
const getUserAuth = (user: IUserInfo | null): IUserAuth => {
    const roles = user?.roles ?? [];
    return {
        isAdmin: roles.includes('ADMIN'),
        isUser: roles.includes('USER'),
        isAuth: !!user,
        roles
    };
};

// Ініціалізація користувача (асинхронна)
export const initializeUser = createAsyncThunk<IUserState>(
    'user/initializeUser',
    async () => {
        const token = await SecureStore.getItemAsync(ACCESS_KEY);
        const user = getUserFromToken(token);
        const auth = getUserAuth(user);
        return { user, token, auth };
    }
);

const initialState: IUserState = {
    user: null,
    token: null,
    auth: { isAuth: false, isAdmin: false, isUser: false, roles: [] }
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials: (state, action: { payload: { token: string } }) => {
            const { token } = action.payload;
            const user = getUserFromToken(token);
            const auth = getUserAuth(user);
            state.user = user;
            state.token = token;
            state.auth = auth;
            // Не ігнорувати проміс
            void SecureStore.setItemAsync(ACCESS_KEY, token);
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
            state.auth = getUserAuth(null);
            // Не ігнорувати проміс
            void SecureStore.deleteItemAsync(ACCESS_KEY);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(initializeUser.fulfilled, (state, action) => {
            Object.assign(state, action.payload);
        });
    }
});

// Селектори
export const getUser = (state: RootState) => state.user.user;
export const getAuth = (state: RootState) => state.user.auth;
export const getToken = (state: RootState) => state.user.token;

export const { setCredentials, logOut } = userSlice.actions;
export default userSlice.reducer;
