import { useTranslation } from 'react-i18next';

import { Page } from 'widgets/Page/Page';

const CartPage = () => {
    const { t } = useTranslation('profile');
    return (
        <Page>
            {t('Профиль')}
        </Page>
    );
};

export default CartPage;
