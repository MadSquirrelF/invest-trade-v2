import { New, NewOrder, NewSortField } from '@/entities/new';
import { rtkApi } from '@/shared/api/rtkApi';

const lastApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNewlastsList: build.query<New[], number>({
            query: (limit) => ({
                url: '/news',
                params: {
                    _limit: limit,
                    _order: NewOrder.DESC,
                    _sort: NewSortField.CREATED,
                },
            }),
        }),
    }),
});

export const useNewlastsList = lastApi.useGetNewlastsListQuery;
