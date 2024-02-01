import { useTranslation } from 'react-i18next';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import styles from './Text.module.scss';
import { VStack } from '../Stack';

export enum TextTheme {
    PRIMARY = 'primary',
}

export enum TextAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center',
}

export enum TextSize {
    XS = 'size_xs',
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

export enum TextBold {
    LIGHT = 'light',
    MEDIUM = 'medium',
    BOLD = 'bold'
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  bold?: TextBold;
  theme?: TextTheme;
  align?: TextAlign;
  size?: TextSize;
}

type HeaderTagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5'

const mapSizeToHeader: Record<TextSize, HeaderTagType> = {
    [TextSize.XS]: 'h5',
    [TextSize.S]: 'h4',
    [TextSize.M]: 'h3',
    [TextSize.L]: 'h2',
    [TextSize.XL]: 'h1',
};

export const Text = memo((props: TextProps) => {
    const { t } = useTranslation();
    const {
        className,
        bold = TextBold.MEDIUM,
        align = TextAlign.LEFT,
        title,
        text,
        theme = TextTheme.PRIMARY,
        size = TextSize.M,
    } = props;

    const HeaderTag = mapSizeToHeader[size];

    const mods: Mods = {
        [styles[theme]]: true,
        [styles[align]]: true,
        [styles[size]]: true,
        [styles[bold]]: true,
    };
    return (
        <VStack gap="16" align="start" className={classNames(styles.TextWrapper, mods, [className])}>
            { title && (<HeaderTag className={styles.title}>{title}</HeaderTag>)}
            { text && (<p className={styles.text}>{text}</p>)}
        </VStack>
    );
});