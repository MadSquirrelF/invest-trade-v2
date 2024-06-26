import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {
    New,
} from '@/entities/new';
import { StateSchema } from '@/app/providers/StoreProvider';
import { NewsPageSchema } from '../types/newsPageSchema';
import { NEWS_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { fetchNewsList } from '../services/fetchNewsList/fetchNewsList';
import { OrderType, SortType, ViewType } from '@/features/FilterContainer';

const newsAdapter = createEntityAdapter<New>({
    selectId: (newItem) => newItem._id,
});

export const getNews = newsAdapter.getSelectors<StateSchema>(
    (state) => state.newsPage || newsAdapter.getInitialState(),
);

const newsPageSlice = createSlice({
    name: 'newsPageSlice',
    initialState: newsAdapter.getInitialState<NewsPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: ViewType.SHORT,
        page: 1,
        limit: 6,
        hasMore: true,
        _inited: false,
        sort: SortType.CREATED,
        search: '',
        order: OrderType.ASC,
    }),
    reducers: {
        setView: (state, action: PayloadAction<ViewType>) => {
            state.view = action.payload;
            localStorage.setItem(NEWS_VIEW_LOCALSTORAGE_KEY, action.payload);
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setOrder: (state, action: PayloadAction<OrderType>) => {
            state.order = action.payload;
        },
        setSort: (state, action: PayloadAction<SortType>) => {
            state.sort = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        initState: (state) => {
            const view = localStorage.getItem(NEWS_VIEW_LOCALSTORAGE_KEY) as ViewType;
            state.view = view;
            state.limit = view === ViewType.FULL ? 4 : 6;
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNewsList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action.meta.arg.replace) {
                    newsAdapter.removeAll(state);
                }
            })
            .addCase(fetchNewsList.fulfilled, (
                state,
                action,
            ) => {
                state.isLoading = false;

                state.hasMore = action.payload.length >= state.limit;

                if (action.meta.arg.replace) {
                    newsAdapter.setAll(state, action.payload);
                } else {
                    newsAdapter.addMany(state, action.payload);
                }
            })
            .addCase(fetchNewsList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    reducer: newsPageReducer,
    actions: newsPageActions,
} = newsPageSlice;
