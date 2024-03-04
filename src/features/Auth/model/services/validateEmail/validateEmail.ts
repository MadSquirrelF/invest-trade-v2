/* eslint-disable max-len */
import { ValidateRegistrationEmailError } from '../../types/registrationSchema';

export const validateEmails = (login: string, email: string) => {
    if (!login || !email) {
        return [ValidateRegistrationEmailError.EMPTY_DATA];
    }

    const errors: ValidateRegistrationEmailError[] = [];
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email.match(emailRegex)) {
        errors.push(ValidateRegistrationEmailError.NOT_VALID_EMAIL);
    }

    if (login.length < 3) {
        errors.push(ValidateRegistrationEmailError.TOO_SHORT_LOGIN);
    }

    return errors;
};
