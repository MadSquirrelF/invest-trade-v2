/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './AccordionItem.module.scss';
import { HStack, VStack } from '../../Stack';
import ArrowIcon from '@/shared/assets/icons/arrow-left.svg';
import { Text, TextBold, TextSize } from '../../Text/Text';
import { Button, ThemeButton } from '../../Button/Button';
import { Info } from '@/entities/Info';

interface AccordionItemProps {
  className?: string;
  item: Info;
  showAnswer: boolean;
  handleIndex: () => void;
}

export const AccordionItem = memo(({
    className,
    item,
    showAnswer,
    handleIndex,
}: AccordionItemProps) => {
    const { t } = useTranslation();

    return (
        <VStack
            max
            justify="center"
            className={classNames(styles.AccordionItem, {}, [className])}
        >

            <Button
                onClick={handleIndex}
                theme={ThemeButton.CLEAR}
                className={classNames(styles.question, { [styles.active]: showAnswer }, [])}
            >
                <Text
                    gap="0"
                    text={item.question}
                    size={TextSize.XXL}
                    textPrimary
                    isActive={showAnswer}
                    bold={TextBold.BOLD}
                    className={styles.questionText}
                />
                <ArrowIcon className={styles.arrow} />
            </Button>

            <HStack justify="start" max className={classNames(styles.answer, { [styles.showAnswer]: showAnswer }, [])}>
                <Text gap="0" text={item.answer} size={TextSize.L} bold={TextBold.MEDIUM} />
            </HStack>

        </VStack>
    );
});
