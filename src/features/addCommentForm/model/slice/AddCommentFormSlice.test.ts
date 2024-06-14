import { AddCommentFormSchema } from '../types/addCommentForm';
import { addCommentFormActions, addCommentFormReducer } from './addCommentFormSlice';

describe('AddCommentFormSlice.test', () => {
    test('test set comment text', () => {
        const state: DeepPartial<AddCommentFormSchema> = { text: '' };

        expect(addCommentFormReducer(state as AddCommentFormSchema, addCommentFormActions.setText('123'))).toStrictEqual({
            text: '123',
        });
    });
});
