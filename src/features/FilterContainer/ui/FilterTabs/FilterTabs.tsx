/* eslint-disable i18next/no-literal-string */
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './FilterTabs.module.scss';
import { HStack } from '@/shared/ui/Stack';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { ITabs } from '@/entities/Product';

interface FilterTabsProps {
  className?: string;
  categories?: ITabs[];
  brands?: ITabs[];
  brandValue?: string;
  categoryValue?: string;
  onCategoryClick?: (category: ITabs) => void;
  onBrandClick?: (brand: ITabs) => void;
}

export const FilterTabs = memo((props: FilterTabsProps) => {
    const { t } = useTranslation();

    const {
        className,
        categories,
        brands,
        brandValue,
        categoryValue,
        onCategoryClick,
        onBrandClick,
    } = props;

    const clickHandleBrand = useCallback(
        (brand: ITabs) => () => {
            onBrandClick?.(brand);
        },
        [onBrandClick],
    );

    const clickHandleCategory = useCallback(
        (category: ITabs) => () => {
            onCategoryClick?.(category);
        },
        [onCategoryClick],
    );

    return (
        <HStack
            max
            gap="16"
            justify="between"
            align="center"
            className={classNames(styles.FilterTabs, {}, [className])}
        >

            <HStack gap="32">
                {
                    categories?.map((category) => (
                        <Button
                            theme={ThemeButton.TAB}
                            key={category.value}
                            helper
                            helperText={category.value}
                            onClick={clickHandleCategory(category)}
                            className={classNames(
                                styles.category,
                                { [styles.selected]: category.value === categoryValue },
                            )}
                        >
                            <category.icon />
                        </Button>
                    ))
                }
            </HStack>

            <HStack gap="16">
                {
                    brands?.map((brand) => (
                        <Button
                            theme={ThemeButton.TAB}
                            key={brand.value}
                            onClick={clickHandleBrand(brand)}
                            helper
                            helperText={brand.value}
                            className={classNames(styles.brand, { [styles.active]: brand.value === brandValue })}
                        >
                            <brand.icon />
                        </Button>
                    ))
                }
            </HStack>

        </HStack>
    );
});
