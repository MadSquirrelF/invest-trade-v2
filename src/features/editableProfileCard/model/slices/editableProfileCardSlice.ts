import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileSchema } from '../types/editableProfileCardSchema';
import { Profile } from '@/entities/Profile';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';

const initialState: ProfileSchema = {
    readonlyContactInfo: true,
    readonlyPersonalInfo: true,
    readonlyPasswordInfo: true,
    readonlyLocationInfo: true,
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setReadonlyContactInfo: (state, action: PayloadAction<boolean>) => {
            state.readonlyContactInfo = action.payload;
        },
        setReadonlyPasswordInfo: (state, action: PayloadAction<boolean>) => {
            state.readonlyPasswordInfo = action.payload;
        },
        setReadonlyPersonalInfo: (state, action: PayloadAction<boolean>) => {
            state.readonlyPersonalInfo = action.payload;
        },
        setReadonlyLocationInfo: (state, action: PayloadAction<boolean>) => {
            state.readonlyLocationInfo = action.payload;
        },
        cancelEdit: (state) => {
            state.readonlyContactInfo = true;
            state.readonlyPasswordInfo = true;
            state.readonlyLocationInfo = true;
            state.readonlyPersonalInfo = true;
            state.validateErrors = undefined;
            state.form = state.data;
        },
        updateProfile: (state, action: PayloadAction<Profile>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchProfileData.fulfilled, (
                state,
                action: PayloadAction<Profile>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload;
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateProfileData.pending, (state) => {
                state.validateErrors = undefined;
                state.isLoading = true;
            })
            .addCase(updateProfileData.fulfilled, (
                state,
            ) => {
                state.isLoading = false;
                state.readonlyContactInfo = true;
                state.readonlyPasswordInfo = true;
                state.readonlyLocationInfo = true;
                state.readonlyPersonalInfo = true;
                state.validateErrors = undefined;
            })
            .addCase(updateProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.validateErrors = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
