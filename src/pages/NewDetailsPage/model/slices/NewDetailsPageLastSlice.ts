import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { New } from '@/entities/new';
import { StateSchema } from '@/app/providers/StoreProvider';
import { NewDetailsLastSchema } from '../types/NewDetailsLastSchema';
import { fetchNewLast } from '../services/fetchNewLast/fetchNewLast';

const lastAdapter = createEntityAdapter<New>({
    selectId: (newItem) => newItem._id,
});

export const getNewLast = lastAdapter.getSelectors<StateSchema>(
    (state) => state.newDetailsPage?.last || lastAdapter.getInitialState(),
);

const NewDetailsLastSlice = createSlice({
    name: 'NewDetailsLastSlice',
    initialState: lastAdapter.getInitialState<NewDetailsLastSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {
        },
    }),
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNewLast.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchNewLast.fulfilled, (
                state,
                action,
            ) => {
                state.isLoading = false;
                lastAdapter.setAll(state, action.payload);
            })
            .addCase(fetchNewLast.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: newDetailsPageLastReducer } = NewDetailsLastSlice;
