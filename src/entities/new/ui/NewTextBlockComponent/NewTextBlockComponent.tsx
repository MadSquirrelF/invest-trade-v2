/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './NewTextBlockComponent.module.scss';
import { NewTextBlock } from '../../model/types/newSchema';
import { Text, TextSize } from '@/shared/ui/Text/Text';

interface NewTextBlockComponentProps {
  className?: string;
  block: NewTextBlock
}

export const NewTextBlockComponent = memo(({ className, block }: NewTextBlockComponentProps) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(styles.NewTextBlockComponent, {}, [className])}>
            {
                block.blockTitle && (
                    <Text title={block.blockTitle} size={TextSize.L} className={styles.title} gap="0" />
                )
            }
            {
                block.paragraphs.map((paragraph) => (
                    <Text key={paragraph} text={paragraph} size={TextSize.L} className={styles.paragraph} gap="0" />
                ))
            }
        </div>
    );
});
