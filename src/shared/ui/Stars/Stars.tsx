/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './Stars.module.scss';
import { HStack } from '../Stack';
import StarIcon from '@/shared/assets/icons/star-icon.svg';
import { Text, TextSize } from '../Text/Text';

interface StarsProps {
  className?: string;
  rating: number;
  isRating: boolean;
  size: number;
}

const getStars = (rating: number, size: number) => new Array(5)
    .fill(0)
    .map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <StarIcon
            className={classNames(styles.star, { [styles.active]: index < rating }, [])}
            key={index}
            style={{
                height: `${size}px`,
                width: `${size}px`,
            }}
        />
    ));

export const Stars = memo(({
    className, rating, isRating, size,
}: StarsProps) => {
    const { t } = useTranslation();

    if (isRating) {
        return (
            <HStack gap="8" className={classNames(styles.Stars, {}, [className])}>
                {
                    [...Array(5)].map((star, index) => (
                        <label>
                            <input type="radio" name="rating" />
                            <StarIcon
                                className={classNames(styles.star, { [styles.active]: index < rating }, [])}
                                style={{
                                    height: `${size}px`,
                                    width: `${size}px`,
                                }}
                                key={index}
                            />
                        </label>
                    ))
                }
            </HStack>
        );
    }

    return (
        <HStack gap="8" className={classNames(styles.Stars, {}, [className])}>
            {getStars(rating, size)}
            <Text gap="0" size={TextSize.L} text={`( ${rating} / 5 )`} />
        </HStack>
    );
});
