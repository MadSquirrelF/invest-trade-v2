import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoginEmail } from './getLoginEmail';

describe('getLoginEmail.test', () => {
    test('SHOULD return value ', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                email: 'admin@mail.ru',
            },
        };
        expect(getLoginEmail(state as StateSchema)).toEqual('admin@mail.ru');
    });

    test('SHOULD work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginEmail(state as StateSchema)).toEqual('');
    });
});
