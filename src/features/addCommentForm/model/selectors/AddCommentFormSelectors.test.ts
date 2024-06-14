import { StateSchema } from '@/app/providers/StoreProvider';
import {
    getAddCommentFormText,
    getAddCommentFormError,
} from './AddCommentFormSelectors';

describe('AddCommentFormSelectors.test', () => {
    test('should return data', () => {
        const data = '123';
        const state: DeepPartial<StateSchema> = {
            addCommentForm: {
                text: data,
            },
        };
        expect(getAddCommentFormText(state as StateSchema)).toEqual(data);
    });

    test('should work with empty state data', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getAddCommentFormText(state as StateSchema)).toEqual('');
    });

    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            addCommentForm: {
                error: 'error',
            },
        };
        expect(getAddCommentFormError(state as StateSchema)).toEqual('error');
    });
    test('should work with empty state error', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getAddCommentFormError(state as StateSchema)).toEqual(undefined);
    });
});
