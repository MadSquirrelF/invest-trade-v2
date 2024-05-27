import { StateSchema } from '@/app/providers/StoreProvider';
import { OrderType, SortType, ViewType } from '@/features/FilterContainer';
import { buildSelector } from '@/shared/lib/store';

export const getNewsPageIsLoading = (state: StateSchema) => state.newsPage?.isLoading || false;
export const getNewsPageError = (state: StateSchema) => state.newsPage?.error;
export const getNewsPageView = (state: StateSchema) => state.newsPage?.view || ViewType.SHORT;
export const getNewsPageNum = (state: StateSchema) => state.newsPage?.page || 1;
export const getNewsPageLimit = (state: StateSchema) => state.newsPage?.limit || 6;
export const getNewsPageHasMore = (state: StateSchema) => state.newsPage?.hasMore;
export const getNewsPageInited = (state: StateSchema) => state.newsPage?._inited;
export const getNewsPageOrder = (state: StateSchema) => state.newsPage?.order ?? OrderType.DESC;
export const getNewsPageSort = (state: StateSchema) => state.newsPage?.sort ?? SortType.CREATED;
export const getNewsPageSearch = (state: StateSchema) => state.newsPage?.search ?? '';

export const [useNewItemById] = buildSelector(
    (state, id: string) => state.newsPage?.entities[id],
);
