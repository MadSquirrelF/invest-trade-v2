/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs/Breadcrumbs';
import { Text, TextBold, TextSize } from '@/shared/ui/Text/Text';
import { HStack, VStack } from '@/shared/ui/Stack';
import styles from './CalculatorPage.module.scss';
import ArrowUp from '@/shared/assets/icons/arrow-up.svg';
import WindowIconTest from '@/shared/assets/icons/WindowIconTest.svg';

import DeleteIcon from '@/shared/assets/icons/trash-icon.svg';
import CopyIcon from '@/shared/assets/icons/copy-icon.svg';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';

interface CalculatorPageProps {
  className?: string;
}

const CalculatorPage = memo(({ className }: CalculatorPageProps) => {
    const { t } = useTranslation();
    return (
        <Page>
            <Breadcrumbs />

            <HStack max justify="between" align="start" gap="32">
                <VStack gap="32" max className={classNames(styles.calculator, {}, [className, 'block'])}>
                    <HStack justify="between" align="center" max gap="16">
                        <HStack gap="32">
                            <Button theme={ThemeButton.SVG_CIRCLE}>
                                <ArrowUp />
                            </Button>

                            <HStack gap="16" align="start">
                                <WindowIconTest className={styles.windowIconTest} />
                                <Text
                                    gap="8"
                                    title="№1 Одностворчатое окно + дверь"
                                    text="800x1200"
                                    bold={TextBold.BOLD}
                                    size={TextSize.M}
                                />
                            </HStack>

                        </HStack>

                        <HStack gap="16">
                            <Button
                                theme={ThemeButton.SVG_BTN}
                                className={styles.icon}
                                helper
                                helperText="Скопировать расчет"
                            >
                                <CopyIcon />
                            </Button>
                            <Button
                                theme={ThemeButton.SVG_BTN}
                                className={styles.icon}
                                helper
                                helperText="Удалить расчет"
                            >
                                <DeleteIcon />
                            </Button>
                        </HStack>

                    </HStack>

                </VStack>
                <div className={classNames('block', {}, [])}>
                    <Text gap="0" title="Расчет стоимости" />
                </div>
            </HStack>

        </Page>
    );
});

export default CalculatorPage;
