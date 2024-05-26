import { Profile } from '@/entities/Profile';
import { rtkApi } from '@/shared/api/rtkApi';

interface updateProfileArg {
  profileId?: string;
  data?: Profile;
}

interface PasswordArg {
    profileId?: string;
    oldPassword: string;
    newPassword: string;
}

const profileApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        updateProfileData: build.mutation<Profile, updateProfileArg>({
            query: ({ profileId, data }) => ({
                url: `/users/profile/${profileId}`,
                method: 'PUT',
                body: data,
            }),
        }),
        updatePasswordData: build.mutation<void, PasswordArg>({
            query: ({ profileId, oldPassword, newPassword }) => ({
                url: `/users/profile/password/${profileId}`,
                method: 'PUT',
                body: {
                    oldPassword,
                    newPassword,
                },
            }),
        }),
        fetchProfileData: build.query<Profile, string>({
            query: (profileId) => ({
                url: `/users/profile/${profileId}`,
                method: 'GET',
            }),
        }),
    }),
});

export const updateProfileDataMutation = profileApi.endpoints.updateProfileData.initiate;

export const updatePasswordDataMutation = profileApi.endpoints.updatePasswordData.initiate;

export const fetchProfileDataQuery = profileApi.endpoints.fetchProfileData.initiate;
