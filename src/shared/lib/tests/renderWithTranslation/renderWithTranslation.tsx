import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18nforTest from '../../../config/i18n/i18nforTest';

export function renderWithTranslation(component: ReactNode) {
    return render(
        <I18nextProvider i18n={i18nforTest}>
            {component}
        </I18nextProvider>,
    );
}
