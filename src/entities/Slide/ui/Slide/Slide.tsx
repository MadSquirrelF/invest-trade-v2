import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './Slide.module.scss';
import { SlideSchema } from '../../model/types/SlideSchema';
import { Text, TextBold, TextSize } from '@/shared/ui/Text/Text';
import { VStack } from '@/shared/ui/Stack';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';

interface SlideProps {
    className?: string;
    slide: SlideSchema;
}

export const Slide = memo((props: SlideProps) => {
    const { className, slide } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(styles.Slide, {}, [className])}>
            <img
                src={slide.poster}
                height="100%"
                width="100%"
                draggable={false}
                alt={slide.description}
                title={slide.title}
                className={styles.image}
            />

            <Text
                title={t('ИНВЕСТ-ТРЕЙД')}
                gap="0"
                bold={TextBold.BOLD}
                size={TextSize.M}
                isActive
                className={styles.logo}
            />

            <VStack align="start" gap="32" className={styles.text}>
                <Text
                    title={slide.title}
                    text={slide.description}
                    gap="16"
                    bold={TextBold.BOLD}
                    size={TextSize.L}
                />
                <Button theme={ThemeButton.DEFAULT}>
                    {t('Смотреть')}
                </Button>
            </VStack>
        </div>
    );
});
