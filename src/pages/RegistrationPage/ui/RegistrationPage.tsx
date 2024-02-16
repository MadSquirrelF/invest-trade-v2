import { useTranslation } from 'react-i18next';

import { Page } from 'widgets/Page/Page';
import { Text, TextBold, TextSize } from 'shared/ui/Text/Text';
import { Breadcrumbs } from 'shared/ui/Breadcrumbs/Breadcrumbs';

const RegistrationPage = () => {
    const { t } = useTranslation('registration');
    return (
        <Page>
            <Text
                gap="16"
                title={t('Регистрация')}
                size={TextSize.L}
                bold={TextBold.MEDIUM}
            />
            <Breadcrumbs />
        </Page>
    );
};

export default RegistrationPage;
