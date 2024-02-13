import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SizeSaveSchema } from '../types/sizesave';

const initialState: SizeSaveSchema = {
    width: window.innerWidth,
    height: window.innerHeight,
};

export const SizeSaveSlice = createSlice({
    name: 'SizeSaveSlice',
    initialState,
    reducers: {
        setWith: (state, action: PayloadAction<number>) => {
            state.width = action.payload;
        },
        setHeight: (state, action: PayloadAction<number>) => {
            state.height = action.payload;
        },

    },
});

export const { actions: SizeSaveActions } = SizeSaveSlice;
export const { reducer: SizeSaveReducer } = SizeSaveSlice;
