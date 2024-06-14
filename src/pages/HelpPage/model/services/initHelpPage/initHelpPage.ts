import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getHelpPageInited } from '../../selectors/helpPageSelectors';
import { CategoryInfoType } from '@/entities/Info';
import { helpPageActions } from '../../slice/helpPageSlice';
import { fetchHelpsList } from '../fetchHelpList/fetchHelpList';

export const initHelpPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>('helpPage/initHelpPage', async (searchParams, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const inited = getHelpPageInited(getState());

    if (!inited) {
        const categoryFromUrl = searchParams.get('category') as CategoryInfoType;
        const searchFromUrl = searchParams.get('search');

        if (categoryFromUrl) {
            dispatch(helpPageActions.setCategory(categoryFromUrl));
        }
        if (searchFromUrl) {
            dispatch(helpPageActions.setSearch(searchFromUrl));
        }

        dispatch(helpPageActions.initState());
        dispatch(fetchHelpsList({}));
    }
});
