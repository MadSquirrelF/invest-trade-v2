/* eslint-disable i18next/no-literal-string */
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getNewDetailsData, getNewDetailsError, getNewDetailsIsLoading } from '../../model/selectors/newDetails';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { newDetailsReducer } from '../../model/slices/newDetailsSlice';
import { NewBlock, NewBlockType } from '../../model/types/newSchema';
import { NewTextBlockComponent } from '../NewTextBlockComponent/NewTextBlockComponent';
import { NewImageBlockComponent } from '../NewImageBlockComponent/NewImageBlockComponent';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Error } from '@/shared/ui/Error/Error';
import styles from './NewDetails.module.scss';
import { Text, TextBold, TextSize } from '@/shared/ui/Text/Text';
import { HStack, VStack } from '@/shared/ui/Stack';
import CalendarIcon from '@/shared/assets/icons/calendar-icon.svg';
import EyeIcon from '@/shared/assets/icons/icon-opened-eye.svg';
import ShareIcon from '@/shared/assets/icons/share-icon.svg';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { convertDate } from '@/shared/lib/convertDate/convertDate';
import { fetchNewBySlug } from '../../model/services/fetchNewBySlug';

interface NewDetailsProps {
  slug: string;
}

const reducers: ReducerList = {
    newDetails: newDetailsReducer,
};

export const NewDetails = memo(({ slug }: NewDetailsProps) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const isLoading = useSelector(getNewDetailsIsLoading);
    const data = useSelector(getNewDetailsData);
    const error = useSelector(getNewDetailsError);

    useInitialEffect(() => dispatch(fetchNewBySlug(slug)));

    const renderBlock = useCallback(
        (block: NewBlock) => {
            switch (block.type) {
            case NewBlockType.IMAGE:
                return <NewImageBlockComponent block={block} key={block._id} />;
            case NewBlockType.TEXT:
                return <NewTextBlockComponent block={block} key={block.blockTitle} />;

            default:
                return null;
            }
        },
        [],
    );

    let content;

    if (isLoading) {
        content = (
            <VStack max align="start" gap="32" className="block">
                <Skeleton width="100%" height={30} border="20px" />
                <Skeleton width="100%" height={30} border="20px" />

                <HStack max align="center" justify="start" gap="32">
                    <HStack gap="10">
                        <Skeleton width={35} height={35} border="50%" />
                        <Skeleton width={200} height={30} border="20px" />
                    </HStack>
                    <HStack gap="10">
                        <Skeleton width={35} height={35} border="20px" />
                        <Skeleton width={50} height={30} border="20px" />
                    </HStack>
                    <Skeleton width={35} height={35} border="50%" />

                </HStack>

                <Skeleton width="100%" height={20} border="20px" />
                <Skeleton width="100%" height={20} border="20px" />
                <Skeleton width="100%" height={50} border="20px" />
                <Skeleton width="100%" height={20} border="20px" />
                <Skeleton width="100%" height={70} border="20px" />
                <Skeleton width="100%" height={80} border="20px" />
                <Skeleton width="100%" height={80} border="20px" />
            </VStack>
        );
    } else if (error) {
        content = (
            <Error error="Произошла ошибка при загрузке статьи" />
        );
    } else if (!data) {
        content = (
            <Error error="Произошла ошибка при загрузке статьи" />
        );
    } else {
        content = (
            <VStack max align="start" gap="32" className="block">
                <Text title={data.title} text={data.subtitle} size={TextSize.XXL} gap="32" bold={TextBold.BOLD} />

                <HStack max align="center" justify="start" gap="32">
                    <HStack gap="10">
                        <CalendarIcon className={styles.icon} />
                        <Text
                            bold={TextBold.BOLD}
                            text={convertDate(data.createdAt)}
                            size={TextSize.L}
                            gap="0"
                            className="date"
                        />
                    </HStack>
                    <HStack gap="10">
                        <EyeIcon className={styles.icon} />
                        <Text bold={TextBold.BOLD} text={String(data.views)} size={TextSize.L} gap="0" />
                    </HStack>
                    <Button type="button" theme={ThemeButton.SVG_CIRCLE} className={styles.btn}>
                        <ShareIcon />
                    </Button>

                </HStack>

                {data?.blocks.map(renderBlock)}
            </VStack>

        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            {content}
        </DynamicModuleLoader>
    );
});
