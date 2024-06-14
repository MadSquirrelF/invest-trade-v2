import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { BrandType, CategoryType, Product } from '@/entities/Product';
import { StateSchema } from '@/app/providers/StoreProvider';
import { ShopPageSchema } from '../types/shopPageSchema';
import { OrderType, SortType, ViewType } from '@/features/FilterContainer';
import { SHOP_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { fetchProductsList } from '../services/fetchProductsList/fetchProductsList';

const shopAdapter = createEntityAdapter<Product>({
    selectId: (productItem) => productItem._id,
});

export const getProducts = shopAdapter.getSelectors<StateSchema>(
    (state) => state.shopPage || shopAdapter.getInitialState(),
);

const shopPageSlice = createSlice({
    name: 'shopPageSlice',
    initialState: shopAdapter.getInitialState<ShopPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: ViewType.SHORT,
        page: 1,
        limit: 6,
        category: CategoryType.PROFILEPVC,
        brand: BrandType.SCHTERN,
        hasMore: true,
        _inited: false,
        sort: SortType.CREATED,
        search: '',
        order: OrderType.ASC,
    }),
    reducers: {
        setView: (state, action: PayloadAction<ViewType>) => {
            state.view = action.payload;
            localStorage.setItem(SHOP_VIEW_LOCALSTORAGE_KEY, action.payload);
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
        setBrand: (state, action: PayloadAction<BrandType>) => {
            state.brand = action.payload;
            state.category = CategoryType.NULL;
        },
        setCategory: (state, action: PayloadAction<CategoryType>) => {
            state.category = action.payload;
            state.brand = BrandType.NULL;
        },
        initState: (state) => {
            const view = localStorage.getItem(SHOP_VIEW_LOCALSTORAGE_KEY) as ViewType;
            state.view = view;
            state.limit = view === ViewType.FULL ? 4 : 6;
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action.meta.arg.replace) {
                    shopAdapter.removeAll(state);
                }
            })
            .addCase(fetchProductsList.fulfilled, (
                state,
                action,
            ) => {
                state.isLoading = false;

                state.hasMore = action.payload.length >= state.limit;

                if (action.meta.arg.replace) {
                    shopAdapter.setAll(state, action.payload);
                } else {
                    shopAdapter.addMany(state, action.payload);
                }
            })
            .addCase(fetchProductsList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    reducer: shopPageReducer,
    actions: shopPageActions,
} = shopPageSlice;
