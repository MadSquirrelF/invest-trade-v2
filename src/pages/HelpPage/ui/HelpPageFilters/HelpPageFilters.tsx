/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable i18next/no-literal-string */
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './HelpPageFilters.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import SearchIcon from '@/shared/assets/icons/search-icon.svg';
import { Text, TextBold, TextSize } from '@/shared/ui/Text/Text';
import { CategoryInfoList, CategoryInfoType } from '@/entities/Info';
import { useHelpFilters } from '../../libs/hooks/useHelpFilters';

interface HelpPageFiltersProps {
  className?: string;
}

export const HelpPageFilters = memo(({ className }: HelpPageFiltersProps) => {
    const { t } = useTranslation('help');

    const {
        onChangeSearch,
        search,
        handleSearch,
        onChangeCategory,
        category,
    } = useHelpFilters();

    const onChangeSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChangeSearch?.(e.target.value);
    };

    const clickHandleCategory = useCallback(
        (category: CategoryInfoType) => () => {
            onChangeCategory?.(category);
        },
        [onChangeCategory],
    );

    return (
        <VStack gap="32" className={classNames(styles.HelpPageFilters, {}, [className])}>
            <HStack gap="32" align="center" className={styles.SearchBox}>
                <HStack gap="10" align="center" justify="start" className={styles.inputWrapper}>
                    <label
                        htmlFor="help-search"
                        className={styles.iconLabel}
                    >
                        <SearchIcon className={styles.icon} />
                    </label>

                    <input
                        type="text"
                        className={styles.input}
                        id="help-search"
                        value={search}
                        onChange={onChangeSearchHandler}
                        placeholder="Задайте вопрос"
                        name="help-search"
                        autoComplete="new-password"
                    />
                </HStack>
                <Button onClick={handleSearch} theme={ThemeButton.DEFAULT}>
                    Искать
                </Button>
            </HStack>

            <Text
                gap="0"
                size={TextSize.XXL}
                bold={TextBold.BOLD}
                text="Найдите ответы среди часто задаваемых нам вопросов"
            />

            <HStack max gap="32" justify="center" className={styles.boxContainer}>
                {
                    CategoryInfoList.map((item) => (

                        <Button
                            theme={ThemeButton.TAB}
                            key={item.value}
                            helper
                            onClick={clickHandleCategory(item.value as CategoryInfoType)}
                            helperText={t(item.value)}
                            className={classNames(
                                styles.category,
                                { [styles.selected]: category === item.value },
                            )}
                        >
                            <item.icon className={styles.iconBox} />
                        </Button>

                    ))
                }

            </HStack>
        </VStack>
    );
});
