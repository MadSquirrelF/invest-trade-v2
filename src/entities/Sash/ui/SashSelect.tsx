import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Sash } from '../model/types/sash';
import { ListBox, ThemeListBox } from '@/shared/ui/ListBox/ListBox';

interface SashSelectProps {
  className?: string;
  value?: Sash;
  onChange?: (idSash: number, value: Sash) => void
  readonly?: boolean;
  id: number;
  label?: string;
}

export const SashSelect = memo(({
    className, value, onChange, id, readonly, label,
}: SashSelectProps) => {
    const { t } = useTranslation();

    const sashOptions = useMemo(
        () => Object.entries(Sash).map((val) => ({ value: val[1], content: val[1] })),
        [],
    );

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(id, value as Sash);
    }, [id, onChange]);

    return (
        <ListBox
            label={label}
            value={value}
            readonly={readonly}
            items={sashOptions}
            className={className}
            theme={ThemeListBox.CLEAR}
            onChange={onChangeHandler}
            direction="bottom right"
        />
    );
});
