import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { CategoryInfoType, Info } from '@/entities/Info';
import { HelpPageSchema } from '../types/helpPageSchema';
import { fetchHelpsList } from '../services/fetchHelpList/fetchHelpList';

const helpAdapter = createEntityAdapter<Info>({
    selectId: (helpItem) => helpItem._id,
});

export const getHelp = helpAdapter.getSelectors<StateSchema>(
    (state) => state.helpPage || helpAdapter.getInitialState(),
);

const helpPageSlice = createSlice({
    name: 'helpPageSlice',
    initialState: helpAdapter.getInitialState<HelpPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        category: CategoryInfoType.GENERAL,
        _inited: false,
        search: '',
    }),
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setCategory: (state, action: PayloadAction<CategoryInfoType>) => {
            state.category = action.payload;
        },
        initState: (state) => {
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHelpsList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action.meta.arg.replace) {
                    helpAdapter.removeAll(state);
                }
            })
            .addCase(fetchHelpsList.fulfilled, (
                state,
                action,
            ) => {
                state.isLoading = false;

                if (action.meta.arg.replace) {
                    helpAdapter.setAll(state, action.payload);
                } else {
                    helpAdapter.addMany(state, action.payload);
                }
            })
            .addCase(fetchHelpsList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    reducer: helpPageReducer,
    actions: helpPageActions,
} = helpPageSlice;
