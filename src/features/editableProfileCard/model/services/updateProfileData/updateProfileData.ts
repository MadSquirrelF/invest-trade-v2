import { createAsyncThunk } from '@reduxjs/toolkit';
import { Profile } from '@/entities/Profile';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { validateProfileData } from '../validateProfileData/validateProfileData';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ValidateProfileError } from '../../types/editableProfileCardSchema';
import { updateProfileDataMutation } from '../../api/profileApi';

export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<ValidateProfileError[]>
    >(
        'profile/updateProfileData',
        async (_, thunkApi) => {
            const { dispatch, rejectWithValue, getState } = thunkApi;

            const formData = getProfileForm(getState());

            const errors = validateProfileData(formData);

            if (errors.length) {
                return rejectWithValue(errors);
            }

            try {
                const response = await dispatch(
                    updateProfileDataMutation({
                        profileId: formData?._id,
                        data: formData,
                    }),
                ).unwrap();

                return response;
            } catch (e) {
                return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
            }
        },
    );
