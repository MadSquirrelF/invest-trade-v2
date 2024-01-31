import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ScrollSaveSchema } from '../types/scrollsave';

const initialState: ScrollSaveSchema = {
    scroll: {},
};

export const ScrollSaveSlice = createSlice({
    name: 'ScrollSaveSlice',
    initialState,
    reducers: {
        setScrollPosition: (state, { payload }: PayloadAction<{path: string, position: number}>) => {
            state.scroll[payload.path] = payload.position;
        },

    },
});

export const { actions: ScrollSaveActions } = ScrollSaveSlice;
export const { reducer: ScrollSaveReducer } = ScrollSaveSlice;
