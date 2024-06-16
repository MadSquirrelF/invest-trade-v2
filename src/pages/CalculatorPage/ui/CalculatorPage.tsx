/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs/Breadcrumbs';

import { EditableCalculationCard } from '@/features/editableCalculationCard';

interface CalculatorPageProps {
  className?: string;
}

const CalculatorPage = memo(({ className }: CalculatorPageProps) => {
    const { t } = useTranslation();
    return (
        <Page>
            <Breadcrumbs />

            <EditableCalculationCard />

        </Page>
    );
});

export default CalculatorPage;
