import { StateSchema } from '@/app/providers/StoreProvider';
import { BrandType, CategoryType } from '@/entities/Product';
import { OrderType, SortType, ViewType } from '@/features/FilterContainer';
import { buildSelector } from '@/shared/lib/store';

export const getShopPageIsLoading = (state: StateSchema) => state.shopPage?.isLoading || false;
export const getShopPageError = (state: StateSchema) => state.shopPage?.error;
export const getShopPageView = (state: StateSchema) => state.shopPage?.view || ViewType.SHORT;
export const getShopPageNum = (state: StateSchema) => state.shopPage?.page || 1;
export const getShopPageLimit = (state: StateSchema) => state.shopPage?.limit || 6;
export const getShopPageHasMore = (state: StateSchema) => state.shopPage?.hasMore;
export const getShopPageInited = (state: StateSchema) => state.shopPage?._inited;
export const getShopPageOrder = (state: StateSchema) => state.shopPage?.order || OrderType.DESC;
export const getShopPageSort = (state: StateSchema) => state.shopPage?.sort || SortType.CREATED;
export const getShopPageSearch = (state: StateSchema) => state.shopPage?.search ?? '';
export const getShopPageBrand = (state: StateSchema) => state.shopPage?.brand || CategoryType.PROFILEPVC;
export const getShopPageCategory = (state: StateSchema) => state.shopPage?.category || BrandType.SCHTERN;

export const [useProductItemById] = buildSelector(
    (state, id: string) => state.shopPage?.entities[id],
);
