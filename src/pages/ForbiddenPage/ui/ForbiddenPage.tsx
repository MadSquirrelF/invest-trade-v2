import { Text } from '@/shared/ui/Text/Text';
import { Page } from '@/widgets/Page/ui/Page/Page';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ForbiddenPage = () => {
    const { t } = useTranslation('');

    return (
        <Page data-testid="ForbiddenPage">
            <Text title={t('У вас нет доступа к этой странице')} gap={'0'} />
        </Page>
    );
};

export default ForbiddenPage;
