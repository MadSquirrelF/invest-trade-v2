import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { ListBox, ThemeListBox } from '@/shared/ui/ListBox/ListBox';
import { Country } from '../../model/types/country';

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void
  readonly?: boolean;
}

export const CountrySelect = memo(({
    className, value, onChange, readonly,
}: CountrySelectProps) => {
    const { t } = useTranslation();

    const countryOptions = useMemo(
        () => Object.entries(Country).map((val) => ({ value: val[0], content: val[1] })),
        [],
    );

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Country);
    }, [onChange]);

    return (
        <ListBox
            value={value}
            className={className}
            readonly={readonly}
            items={countryOptions}
            theme={ThemeListBox.CLEAR}
            onChange={onChangeHandler}
            direction="bottom right"
        />
    );
});
