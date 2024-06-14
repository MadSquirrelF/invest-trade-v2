import { StateSchema } from '@/app/providers/StoreProvider';
import { CategoryInfoType } from '@/entities/Info';

import { buildSelector } from '@/shared/lib/store';

export const getHelpPageIsLoading = (state: StateSchema) => state.helpPage?.isLoading || false;
export const getHelpPageError = (state: StateSchema) => state.helpPage?.error;
export const getHelpPageInited = (state: StateSchema) => state.helpPage?._inited;
export const getHelpPageSearch = (state: StateSchema) => state.helpPage?.search ?? '';
export const getHelpPageCategory = (state: StateSchema) => state.helpPage?.category || CategoryInfoType.GENERAL;

export const [useProductItemById] = buildSelector(
    (state, id: string) => state.helpPage?.entities[id],
);
