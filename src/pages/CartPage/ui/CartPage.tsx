import { useTranslation } from 'react-i18next';
import { Text, TextBold, TextSize } from '@/shared/ui/Text/Text';

import { Page } from '@/widgets/Page/ui/Page/Page';

const CartPage = () => {
    const { t } = useTranslation('сart');
    return (
        <Page>
            <Text
                gap="16"
                title={t('Корзина')}
                size={TextSize.L}
                bold={TextBold.MEDIUM}
            />
        </Page>
    );
};

export default CartPage;
