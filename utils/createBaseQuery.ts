import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { BASE_URL } from '@/constants/Urls';
import { RootState } from '@/store';

export const createBaseQuery = (endpoint: string) =>
    fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/${endpoint}/`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            console.log("Категорія Url:", `${BASE_URL}/api/${endpoint}/`);
            return headers;
        }
    });
