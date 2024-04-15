/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text, TextBold, TextSize } from '@/shared/ui/Text/Text';
import styles from './NewLastList.module.scss';
import { useNewlastsList } from '../../api/newLastsApi';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Error } from '@/shared/ui/Error/Error';
import { convertDate } from '@/shared/lib/convertDate/convertDate';

interface NewLastListProps {
  className?: string;
}

export const NewLastList = memo(({ className }: NewLastListProps) => {
    const { t } = useTranslation();

    const { isLoading, data: news, error } = useNewlastsList(4);

    if (error) {
        return <Error error="Ошибка загрузки последних новостей" />;
    }

    return (
        <VStack align="start" max gap="0" className={classNames('block', {}, [className, styles.NewLastList])}>
            <Text title="Последние новости" size={TextSize.M} gap="0" className={styles.title} />

            {
                isLoading ? (
                    <Skeleton />
                ) : (
                    news?.map((newItem) => (
                        <HStack key={newItem.slug} justify="start" max gap="32" className={styles.item}>
                            <img
                                src={`${__API_IMAGE__}${newItem.preview_img}`}
                                alt=""
                                className={styles.image}
                                draggable={false}
                                width={100}
                                height={100}
                            />

                            <VStack gap="32" align="start" justify="between" max>
                                <Text gap="0" title={newItem.title} size={TextSize.S} />
                                <Text
                                    gap="0"
                                    text={convertDate(newItem.createdAt)}
                                    size={TextSize.S}
                                    bold={TextBold.BOLD}
                                    className="date"
                                />
                            </VStack>
                        </HStack>
                    ))
                )
            }

        </VStack>
    );
});
