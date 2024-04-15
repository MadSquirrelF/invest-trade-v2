import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { newDetailsPageReducer } from '../../model/slices';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from '@/widgets/Page';
import { HStack } from '@/shared/ui/Stack';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs/Breadcrumbs';
import { NewDetails } from '@/entities/new';
import { NewLastList } from '@/features/NewLastList';

interface NewDetailsPageProps {
    className?: string;
}

const reducers: ReducerList = {
    newDetailsPage: newDetailsPageReducer,
};

const NewDetailsPage = (props: NewDetailsPageProps) => {
    const { className } = props;

    const { t } = useTranslation();

    const { slug } = useParams<{slug: string}>();

    const dispatch = useAppDispatch();

    if (!slug) {
        return (
            <div className={classNames('', {}, [className])}>
                {t('Статья не найдена')}
            </div>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames('', {}, [className])}>
                <Breadcrumbs />
                <HStack max align="start" gap="32">
                    <NewDetails slug={slug} />
                    <NewLastList />
                </HStack>
            </Page>
        </DynamicModuleLoader>

    );
};

export default NewDetailsPage;
