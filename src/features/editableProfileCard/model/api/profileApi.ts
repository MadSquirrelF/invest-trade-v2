import { Profile } from '@/entities/Profile';
import { rtkApi } from '@/shared/api/rtkApi';

interface updateProfileArg {
  profileId?: string;
  data?: Profile;
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
        fetchProfileData: build.query<Profile, string>({
            query: (profileId) => ({
                url: `/users/profile/${profileId}`,
                method: 'GET',
            }),
        }),
    }),
});

export const updateProfileDataMutation = profileApi.endpoints.updateProfileData.initiate;

export const fetchProfileDataQuery = profileApi.endpoints.fetchProfileData.initiate;
