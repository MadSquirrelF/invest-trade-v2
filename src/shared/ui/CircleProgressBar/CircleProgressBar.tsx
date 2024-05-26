/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import CountUp from 'react-countup';
import styles from './CircleProgressBar.module.scss';
import { Text, TextBold, TextSize } from '../Text/Text';
import { HStack } from '../Stack';

interface CircleProgressBarProps {
  className?: string;
  percentage: number;
  radius: number;
  isLoading?: boolean;
  isPercentageShown: boolean;
  strokeWidth: number;
  circleWidth: number;
}

export const CircleProgressBar = memo((props: CircleProgressBarProps) => {
    const { t } = useTranslation();

    const {
        className,
        isLoading,
        percentage,
        radius,
        isPercentageShown,
        strokeWidth,
        circleWidth,
    } = props;

    const dashArray = radius * Math.PI * 2;

    const dashOffset = dashArray - (dashArray * percentage) / 100;

    if (isLoading) {
        return (
            <div className={styles.wrapper}>
                <svg
                    width={circleWidth}
                    height={circleWidth}
                    viewBox={`0 0 ${circleWidth} ${circleWidth}`}
                    className={styles.CircleProgressBar}
                >

                    <defs>
                        <linearGradient
                            id="circle-progress-bar"
                            x1="62.5"
                            y1="-24"
                            x2="0.00036662"
                            y2="10.5007"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="var(--active-color-disabled)" />
                            <stop
                                offset="1"
                                stopColor="var(--active-color-default)"
                            />
                        </linearGradient>
                    </defs>
                    <circle
                        cx={circleWidth / 2}
                        cy={circleWidth / 2}
                        strokeWidth={`${strokeWidth}px`}
                        r={radius}
                        className={styles.background}
                    />

                    <circle
                        cx={circleWidth / 2}
                        cy={circleWidth / 2}
                        strokeWidth={`${strokeWidth}px`}
                        r={radius}
                        className={styles.progressAnimation}
                        stroke="url(#circle-progress-bar)"
                        transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
                    />

                </svg>

            </div>

        );
    }

    return (
        <div className={styles.wrapper}>
            <svg
                width={circleWidth}
                height={circleWidth}
                viewBox={`0 0 ${circleWidth} ${circleWidth}`}
                className={styles.CircleProgressBar}
            >

                <defs>
                    <linearGradient
                        id="circle-progress-bar"
                        x1="62.5"
                        y1="-24"
                        x2="0.00036662"
                        y2="10.5007"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="var(--active-color-disabled)" />
                        <stop
                            offset="1"
                            stopColor="var(--active-color-default)"
                        />
                    </linearGradient>
                </defs>
                <circle
                    cx={circleWidth / 2}
                    cy={circleWidth / 2}
                    strokeWidth={`${strokeWidth}px`}
                    r={radius}
                    className={styles.background}
                />

                <circle
                    cx={circleWidth / 2}
                    cy={circleWidth / 2}
                    strokeWidth={`${strokeWidth}px`}
                    r={radius}
                    className={styles.progress}
                    style={{
                        strokeDasharray: dashArray,
                        strokeDashoffset: dashOffset,
                    }}
                    stroke="url(#circle-progress-bar)"
                    transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
                />

            </svg>

            {isPercentageShown ? (
                <HStack gap="0" align="end" className={styles.percentageWrapper}>
                    <CountUp
                        start={1}
                        end={percentage}
                        duration={2}
                        delay={0}
                        className={styles.percentageCount}
                    />
                    <Text
                        text="%"
                        bold={TextBold.BOLD}
                        size={TextSize.XL}
                        isActive
                        gap="0"
                        className={styles.percent}
                    />
                </HStack>

            ) : null}
        </div>

    );
});
