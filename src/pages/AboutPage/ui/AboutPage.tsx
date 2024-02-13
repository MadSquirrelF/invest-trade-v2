import { useTranslation } from 'react-i18next';

import { Page } from 'widgets/Page/Page';
import { Text, TextBold, TextSize } from 'shared/ui/Text/Text';

const AboutPage = () => {
    const { t } = useTranslation('about');
    return (
        <Page>
            <Text
                gap="16"
                title={t('О компании')}
                size={TextSize.L}
                bold={TextBold.MEDIUM}
            />
        </Page>
    );
};

export default AboutPage;
