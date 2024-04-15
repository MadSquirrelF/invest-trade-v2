import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { ListBox, ThemeListBox } from '@/shared/ui/ListBox/ListBox';
import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void
  readonly?: boolean;
}

export const CurrencySelect = memo(({
    className, value, onChange, readonly,
}: CurrencySelectProps) => {
    const { t } = useTranslation();

    const currencyOptions = useMemo(
        () => Object.entries(Currency).map((val) => ({ value: val[0], content: val[1] })),
        [],
    );

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Currency);
    }, [onChange]);

    return (
        <ListBox
            value={value}
            readonly={readonly}
            items={currencyOptions}
            className={className}
            theme={ThemeListBox.CLEAR}
            onChange={onChangeHandler}
            direction="bottom right"
        />
    );
});
