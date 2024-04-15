import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '@/entities/Profile';
import { fetchProfileDataQuery } from '../../api/profileApi';

export const fetchProfileData = createAsyncThunk<
    Profile,
    string,
    ThunkConfig<string>
    >(
        'profile/fetchProfileData',
        async (profileId, thunkApi) => {
            const { dispatch, rejectWithValue } = thunkApi;

            try {
                const response = await dispatch(
                    fetchProfileDataQuery(profileId),
                ).unwrap();

                return response;
            } catch (e : any) {
                return rejectWithValue(e.response.data.message);
            }
        },
    );
