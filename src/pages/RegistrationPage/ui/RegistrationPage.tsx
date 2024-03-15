import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page/ui/Page/Page';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs/Breadcrumbs';

import { classNames } from '@/shared/lib/classNames/classNames';
import { RegistrationForm } from '@/features/Auth/ui/RegistrationForm/RegistrationForm';

const RegistrationPage = () => {
    const { t } = useTranslation('registration');

    return (
        <Page>
            <Breadcrumbs />
            <div className={classNames('block', {}, [])}>
                <RegistrationForm />
            </div>
        </Page>
    );
};

export default RegistrationPage;
