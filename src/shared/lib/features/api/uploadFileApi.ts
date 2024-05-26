import { rtkApi } from '@/shared/api/rtkApi';

interface UploadNewImageOptions {
    folder: string;
    file: FormData;
}

const uploadFile = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        uploadFile: build.query<{ url: string; name: string }[], UploadNewImageOptions>({
            query: ({ file, folder }) => ({
                url: '/files',
                method: 'POST',
                params: { folder },
                body: file,
            }),
        }),
    }),
});

export const uploadImageQuery = uploadFile.endpoints.uploadFile.initiate;
