import { New } from '@/entities/new';
import { OrderType, SortType } from '@/features/FilterContainer';
import { rtkApi } from '@/shared/api/rtkApi';

const lastApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNewlastsList: build.query<New[], number>({
            query: (limit) => ({
                url: '/news',
                params: {
                    _limit: limit,
                    _order: OrderType.DESC,
                    _sort: SortType.CREATED,
                },
            }),
        }),
    }),
});

export const useNewlastsList = lastApi.useGetNewlastsListQuery;
