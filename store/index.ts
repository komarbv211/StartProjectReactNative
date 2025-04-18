import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { accountApi } from '@/services/accountService'
import authReducer from './slices/userSlice';

export const index = configureStore({
    reducer: {
        user: authReducer,
        [accountApi.reducerPath]: accountApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(accountApi.middleware), // Додаємо API middleware
});

export type RootState = ReturnType<typeof index.getState>;
export type AppDispatch = typeof index.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector