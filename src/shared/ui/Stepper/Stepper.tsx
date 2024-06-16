import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './Stepper.module.scss';
import { Text, TextAlign, TextBold } from '../Text/Text';
import { HStack, VStack } from '../Stack';

export interface IStepper {
    id: number;
    title: string;
    Icon: React.VFC<React.SVGProps<SVGAElement>>;
  }

interface StepperProps {
  className?: string;
  steps: IStepper[];
  currentStep: number;
}

export const Stepper = memo((props: StepperProps) => {
    const { t } = useTranslation();

    const { className, steps, currentStep } = props;

    return (
        <HStack max justify="between" className={styles.Stepper}>
            {
                steps.map((step) => (
                    <VStack
                        max
                        align="center"
                        justify="between"
                        gap="16"
                        key={step.id}
                        className={classNames(styles.step, {
                            [styles.active]: step.id === currentStep,
                            [styles.complete]: step.id < currentStep,
                        }, [])}
                    >
                        <HStack
                            justify="center"
                            align="center"
                            className={styles.iconContainer}
                        >
                            <step.Icon className={styles.icon} />
                        </HStack>
                        <Text
                            text={step.title}
                            gap="0"
                            align={TextAlign.CENTER}
                            bold={TextBold.BOLD}
                            className={styles.title}
                        />
                    </VStack>
                ))
            }
        </HStack>
    );
});
