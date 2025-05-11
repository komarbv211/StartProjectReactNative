import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '@/utils/createBaseQuery';
import { ICategoryItem, ICategoryCreate, ICategoryEdit } from "@/interfaces/category";

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: createBaseQuery('categories'),
    tagTypes: ['Categories'],

    endpoints: (builder) => ({
        getCategories: builder.query<ICategoryItem[], void>({
            query: () => '',
            providesTags: ['Categories'],
        }),

        createCategory: builder.mutation<ICategoryCreate, FormData>({
            query: (formData) => ({
                url: '',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Categories'],
        }),

        editCategory: builder.mutation <ICategoryEdit, FormData>({
            query: (FormData) => ({
                url: '',
                method: 'PUT',
                body: FormData,
            }),
            invalidatesTags: ['Categories'],
        }),

        deleteCategory: builder.mutation<void, number>({
            query: (id) => ({
                url: `${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Categories'],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useEditCategoryMutation,
    useDeleteCategoryMutation
} = categoryApi;
