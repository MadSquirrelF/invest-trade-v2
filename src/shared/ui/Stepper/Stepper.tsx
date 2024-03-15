import { FC } from 'react';
import Mail from '@/shared/assets/icons/mail.svg';
import Password from '@/shared/assets/icons/password.svg';
import PersonalInfo from '@/shared/assets/icons/personal-info.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './Stepper.module.scss';
import { Text, TextAlign, TextBold } from '../Text/Text';
import { HStack, VStack } from '../Stack';

interface IStepper {
  id: number;
  title: string;
  Icon: React.VFC<React.SVGProps<SVGAElement>>;
}

const steps: IStepper[] = [
    {
        id: 0,
        title: 'Логин и почта',
        Icon: Mail,
    },
    {
        id: 1,
        title: 'Придумайте пароль',
        Icon: Password,
    },
    {
        id: 2,
        title: 'Персональные данные',
        Icon: PersonalInfo,
    },
];

const Stepper: FC<{ currentStep: number }> = ({ currentStep }) => (
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
                        max
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

export default Stepper;
