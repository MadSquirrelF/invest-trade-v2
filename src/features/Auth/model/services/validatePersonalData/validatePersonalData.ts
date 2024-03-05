/* eslint-disable camelcase */
import { ValidateRegistrationPersonalDataError } from '../../types/registrationSchema';

export const validatePersonalData = (firstname: string, lastname: string, phone_number: string) => {
    if (!firstname || !lastname) {
        return [ValidateRegistrationPersonalDataError.EMPTY_DATA];
    }

    const errors: ValidateRegistrationPersonalDataError[] = [];

    if (firstname.length < 3) {
        errors.push(ValidateRegistrationPersonalDataError.TOO_SHORT_FIRSTNAME);
    }

    if (lastname.length < 3) {
        errors.push(ValidateRegistrationPersonalDataError.TOO_SHORT_LASTNAME);
    }

    return errors;
};
