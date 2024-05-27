/* eslint-disable i18next/no-literal-string */
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './NewListItem.module.scss';
import { New } from '../../model/types/newSchema';
import {
    Text, TextAlign, TextBold, TextSize,
} from '@/shared/ui/Text/Text';
import ShareIcon from '@/shared/assets/icons/share-icon.svg';
import ArrowRight from '@/shared/assets/icons/arrow-right.svg';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { getRouteNewDetails } from '@/shared/const/router';
import { convertDate } from '@/shared/lib/convertDate/convertDate';
import { ViewType } from '@/features/FilterContainer';

interface NewListItemProps {
  className?: string;
  newItem: New;
  view: ViewType;
  target?: HTMLAttributeAnchorTarget;
}

export const NewListItem = memo((props: NewListItemProps) => {
    const { t } = useTranslation();

    const {
        className, newItem, view, target,
    } = props;

    if (view === ViewType.FULL) {
        return (
            <HStack gap="32" align="start" className={classNames(styles.NewListItem, {}, [className, styles[view]])}>
                <img
                    src={`${__API_IMAGE__}${newItem.preview_img}`}
                    alt={newItem.title}
                    title={newItem.title}
                    height="100%"
                    width="450px"
                    className={styles.image}
                    draggable={false}
                />

                <VStack align="start" gap="32" justify="between" className={styles.text}>
                    <Text
                        title={newItem.title}
                        align={TextAlign.LEFT}
                        text={newItem.subtitle}
                        gap="16"
                        bold={TextBold.BOLD}
                        size={TextSize.XL}
                    />

                    <Text
                        text={convertDate(newItem.createdAt)}
                        gap="0"
                        className={styles.date}
                        align={TextAlign.LEFT}
                        bold={TextBold.BOLD}
                        size={TextSize.L}
                    />
                </VStack>

                <HStack gap="16">
                    <Button type="button" theme={ThemeButton.SVG_CIRCLE} className={styles.btn}>
                        <ShareIcon />
                    </Button>
                    <Button type="button" theme={ThemeButton.SVG_CIRCLE} className={styles.btn}>
                        <AppLink
                            target={target}
                            to={getRouteNewDetails(newItem.slug)}
                        >
                            <ArrowRight className={styles.btnIcon} />
                        </AppLink>
                    </Button>
                </HStack>

            </HStack>
        );
    }

    return (
        <HStack gap="32" align="start" className={classNames(styles.NewListItem, {}, [className, styles[view]])}>

            <VStack align="start" gap="32" justify="between" className={styles.text}>
                <Text
                    title={newItem.title}
                    align={TextAlign.LEFT}
                    text={newItem.subtitle}
                    gap="16"
                    bold={TextBold.BOLD}
                    size={TextSize.XL}
                />

                <Text
                    text={convertDate(newItem.createdAt)}
                    gap="0"
                    className={styles.date}
                    align={TextAlign.LEFT}
                    bold={TextBold.BOLD}
                    size={TextSize.L}
                />
            </VStack>

            <HStack gap="16">
                <Button type="button" theme={ThemeButton.SVG_CIRCLE} className={styles.btn}>
                    <ShareIcon />
                </Button>
                <Button type="button" theme={ThemeButton.SVG_CIRCLE} className={styles.btn}>
                    <AppLink
                        target={target}
                        to={getRouteNewDetails(newItem.slug)}
                    >
                        <ArrowRight className={styles.btnIcon} />
                    </AppLink>
                </Button>
            </HStack>

        </HStack>

    );
});
