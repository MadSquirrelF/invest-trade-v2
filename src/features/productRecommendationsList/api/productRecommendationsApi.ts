import { Product } from '@/entities/Product';
import { rtkApi } from '@/shared/api/rtkApi';

const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getProductRecommendationsList: build.query<Product[], number>({
            query: (limit) => ({
                url: '/products',
                params: {
                    _limit: limit,
                },
            }),
        }),
    }),
});

export const useProductRecommendationsList = recommendationsApi.useGetProductRecommendationsListQuery;
