import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { uploadImageQuery } from '../api/uploadFileApi';

interface UploadNewImageOptions {
    folder: string;
    file: FormData;
}

export const uploadNewImage = createAsyncThunk<
    void,
    UploadNewImageOptions,
    ThunkConfig<string>
>('@/features/uploadNewImage', async ({ folder, file }, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    try {
        await dispatch(
            uploadImageQuery({
                file,
                folder,
            }),
        );
        return undefined;
    } catch (e : any) {
        return rejectWithValue(e.response.data.message);
    }
});
