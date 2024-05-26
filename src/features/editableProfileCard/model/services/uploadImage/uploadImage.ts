import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

interface UploadNewImageOptions {
  folder: string;
  file: FormData;
}

export const uploadImage = createAsyncThunk<
    void,
    UploadNewImageOptions,
    ThunkConfig<string>
>('editableProfileCard/uploadImage', async (formData, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post<UploadNewImageOptions>(
            '/files',
            formData.file,
            {
                params: { },
                headers: { 'Content-Type': 'multipart/form-data' },
            },
        );

        if (!response.data) {
            console.log(response.data);
        }

        return undefined;
    } catch (e : any) {
        return rejectWithValue(e.response.data.message);
    }
});
