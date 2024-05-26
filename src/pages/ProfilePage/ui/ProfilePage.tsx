import { useTranslation } from 'react-i18next';

import { useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page';
import { Error } from '@/shared/ui/Error/Error';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs/Breadcrumbs';
import { EditableProfileCard } from '@/features/editableProfileCard';

const CartPage = () => {
    const { id } = useParams<{ id: string }>();

    const { t } = useTranslation('profile');

    if (!id) {
        return <Error error={t('Профиль не найден')} />;
    }

    return (
        <Page>
            <Breadcrumbs />

            <EditableProfileCard id={id} />
        </Page>
    );
};

export default CartPage;
