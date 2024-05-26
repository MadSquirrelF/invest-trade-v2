import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileSchema, ReadOnlyInfo } from '../types/editableProfileCardSchema';
import { Profile } from '@/entities/Profile';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { updatePasswordData } from '../services/updatePasswordData/updatePasswordData';

const initialState: ProfileSchema = {
    readonlyInfo: ReadOnlyInfo.NULL,
    oldPassword: '',
    newPassword: '',
    repeatNewPassword: '',
    validatePasswordErrors: [],
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setReadonlyInfo: (state, action: PayloadAction<ReadOnlyInfo>) => {
            state.readonlyInfo = action.payload;
        },
        cancelEdit: (state) => {
            state.readonlyInfo = ReadOnlyInfo.NULL;
            state.validateErrors = undefined;
            state.form = state.data;
        },
        cancelEditPassword: (state) => {
            state.readonlyInfo = ReadOnlyInfo.NULL;
            state.validatePasswordErrors = undefined;
            state.oldPassword = '';
            state.newPassword = '';
            state.repeatNewPassword = '';
        },
        updateNewPassword: (state, action: PayloadAction<string>) => {
            state.newPassword = action.payload;
        },
        updateOldPassword: (state, action: PayloadAction<string>) => {
            state.oldPassword = action.payload;
        },
        updateRepeatNewPassword: (state, action: PayloadAction<string>) => {
            state.repeatNewPassword = action.payload;
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
            .addCase(updateProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload;
                state.readonlyInfo = ReadOnlyInfo.NULL;
                state.validateErrors = undefined;
            })
            .addCase(updateProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.validateErrors = action.payload;
            })
            .addCase(updatePasswordData.pending, (state) => {
                state.validatePasswordErrors = undefined;
                state.isLoading = true;
            })
            .addCase(updatePasswordData.fulfilled, (state) => {
                state.isLoading = false;
                state.readonlyInfo = ReadOnlyInfo.NULL;
                state.validatePasswordErrors = undefined;
                state.oldPassword = '';
                state.newPassword = '';
                state.repeatNewPassword = '';
            })
            .addCase(updatePasswordData.rejected, (state, action) => {
                state.isLoading = false;
                state.validatePasswordErrors = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
