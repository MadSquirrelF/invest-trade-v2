/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './CircleProgressBar.module.scss';

interface CircleProgressBarProps {
  className?: string;
  percentage: number;
  radius: number;
  isPercentageShown: boolean;
  strokeWidth: number;
  circleWidth: number;
}

export const CircleProgressBar = memo((props: CircleProgressBarProps) => {
    const { t } = useTranslation();

    const {
        className,
        percentage,
        radius,
        isPercentageShown,
        strokeWidth,
        circleWidth,
    } = props;

    const dashArray = radius * Math.PI * 2;

    const dashOffset = dashArray - (dashArray * percentage) / 100;

    return (
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
                    <stop stopColor="#1E0E5A" />
                    <stop
                        offset="1"
                        stopColor="#725AE3"
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

            {isPercentageShown ? (
                <text
                    x="50%"
                    y="50%"
                    dy="0.3em"
                    textAnchor="middle"
                    data-cy="circle-percentage-text"
                    className={styles.percentage}
                >
                    {percentage}
                    %
                </text>
            ) : null}

        </svg>
    );
});
