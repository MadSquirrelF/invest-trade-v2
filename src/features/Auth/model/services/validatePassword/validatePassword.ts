import { ValidateRegistrationPasswordError } from '../../types/registrationSchema';

export const validatePassword = (password: string, repeatPassword: string) => {
    if (!password || !repeatPassword) {
        return [ValidateRegistrationPasswordError.EMPTY_PASSWORD];
    }

    const errors: ValidateRegistrationPasswordError[] = [];

    if (password !== repeatPassword) {
        errors.push(ValidateRegistrationPasswordError.NO_MATCH_PASSWORDS);
    }

    if (password.length < 6) {
        errors.push(ValidateRegistrationPasswordError.TOO_SHORT_PASSWORD);
    }

    return errors;
};
