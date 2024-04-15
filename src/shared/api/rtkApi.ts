import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: __API__,
        prepareHeaders: (headers) => {
            const accessToken = Cookies.get('accessToken');
            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`);
            }
        },
    }),
    endpoints: (builder) => ({}),
});
