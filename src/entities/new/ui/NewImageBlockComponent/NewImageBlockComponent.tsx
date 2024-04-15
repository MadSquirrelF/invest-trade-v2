/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './NewImageBlockComponent.module.scss';
import { NewImageBlock } from '../../model/types/newSchema';
import { Text, TextAlign } from '@/shared/ui/Text/Text';

interface NewImageBlockComponentProps {
  className?: string;
  block: NewImageBlock;
}

export const NewImageBlockComponent = memo(({ className, block }: NewImageBlockComponentProps) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(styles.NewImageBlockComponent, {}, [className])}>
            <img src={`${__API_IMAGE__}${block.src}`} alt={block.title} className={styles.img} />
            {block.title && (
                <Text text={block.title} align={TextAlign.CENTER} gap="0" />
            )}
        </div>
    );
});
