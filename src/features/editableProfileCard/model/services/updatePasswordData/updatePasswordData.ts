/* eslint-disable consistent-return */
/* eslint-disable ulbi-tv-plugin/layer-imports */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { updatePasswordDataMutation } from '../../api/profileApi';
import {
    getProfileNewPassword,
    getProfileOldPassword,
    getProfileRepeatNewPassword,
} from '../../selectors/getProfilePassword/getProfilePassword';
import { ValidateRegistrationPasswordError, validatePassword } from '@/features/Auth';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

export const updatePasswordData = createAsyncThunk<
    void,
    void,
    ThunkConfig<ValidateRegistrationPasswordError[]>
    >(
        'profile/updatePasswordData',
        async (_, thunkApi) => {
            const { dispatch, rejectWithValue, getState } = thunkApi;

            const formData = getProfileForm(getState());

            const oldPassword = getProfileOldPassword(getState());

            const newPassword = getProfileNewPassword(getState());

            const repeatNewPassword = getProfileRepeatNewPassword(getState());

            const errors = validatePassword(newPassword || '', repeatNewPassword || '');

            if (errors.length) {
                return rejectWithValue(errors);
            }

            try {
                await dispatch(
                    updatePasswordDataMutation({
                        profileId: formData?._id,
                        newPassword,
                        oldPassword,
                    }),
                ).unwrap();

                return undefined;
            } catch (e) {
                return rejectWithValue([ValidateRegistrationPasswordError.SERVER_ERROR]);
            }
        },
    );
