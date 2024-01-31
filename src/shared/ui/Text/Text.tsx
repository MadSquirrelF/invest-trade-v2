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
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
  size?: TextSize;
}

type HeaderTagType = 'h1' | 'h2' | 'h3' | 'h4'

const mapSizeToHeader: Record<TextSize, HeaderTagType> = {
    [TextSize.XS]: 'h4',
    [TextSize.S]: 'h3',
    [TextSize.M]: 'h2',
    [TextSize.L]: 'h1',
};

export const Text = memo((props: TextProps) => {
    const { t } = useTranslation();
    const {
        className, align = TextAlign.LEFT, title, text, theme = TextTheme.PRIMARY, size = TextSize.M,
    } = props;

    const HeaderTag = mapSizeToHeader[size];

    const mods: Mods = {
        [styles[theme]]: true,
        [styles[align]]: true,
        [styles[size]]: true,
    };
    return (
        <VStack gap="16" align="start" className={classNames(styles.TextWrapper, mods, [className])}>
            { title && (<HeaderTag className={styles.title}>{title}</HeaderTag>)}
            { text && (<p className={styles.text}>{text}</p>)}
        </VStack>
    );
});
