/* eslint-disable i18next/no-literal-string */
import { ChangeEventHandler, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './RangeInput.module.scss';
import { HStack, VStack } from '../Stack';
import { Text, TextBold, TextSize } from '../Text/Text';

interface RangeInputProps {
  className?: string;
  title: string;
  max: number;
  min: number;
  step: number;
  value: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const RangeInput = memo(({
    className, title, max, min, step, value, onChange,
}: RangeInputProps) => {
    const { t } = useTranslation();
    return (
        <VStack align="start" max className={classNames(styles.RangeInput, {}, [className])}>

            <Text
                gap="0"
                size={TextSize.S}
                textPrimary
                bold={TextBold.MEDIUM}
                title={title}
            />

            <HStack max gap="50" className={styles.field}>
                <Text
                    gap="0"
                    size={TextSize.M}
                    isActive
                    bold={TextBold.MEDIUM}
                    title={String(min)}
                />
                <input
                    type="range"
                    className={styles.input}
                    value={value}
                    onChange={onChange}
                    max={max}
                    min={min}
                    step={step}
                />
                <Text
                    gap="0"
                    size={TextSize.M}
                    isActive
                    bold={TextBold.MEDIUM}
                    title={String(max)}
                />
            </HStack>

        </VStack>
    );
});
