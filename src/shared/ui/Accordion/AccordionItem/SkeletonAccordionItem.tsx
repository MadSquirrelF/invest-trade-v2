/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './AccordionItem.module.scss';
import { Skeleton } from '../../Skeleton/Skeleton';
import ArrowIcon from '@/shared/assets/icons/arrow-left.svg';
import { VStack } from '../../Stack';
import { Button, ThemeButton } from '../../Button/Button';

interface SkeletonAccordionItemProps {
  className?: string;
}

export const SkeletonAccordionItem = memo(({ className }: SkeletonAccordionItemProps) => {
    const { t } = useTranslation();
    return (
        <VStack
            max
            justify="center"
            className={classNames(styles.AccordionItem, {}, [className])}
        >

            <Button
                theme={ThemeButton.CLEAR}
                className={classNames(styles.question, {}, [])}
            >
                <Skeleton border="20px" width="70%" height={60} />
                <ArrowIcon className={styles.arrow} />
            </Button>

        </VStack>
    );
});
