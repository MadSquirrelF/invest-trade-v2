/* eslint-disable i18next/no-literal-string */
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import Stepper from 'shared/ui/Stepper/Stepper';
import { HStack, VStack } from 'shared/ui/Stack';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { CSSTransition } from 'react-transition-group';
import PasswordBg from 'shared/assets/images/password-bg.svg';
import PersonalInfoBg from 'shared/assets/images/personalInfoBg.svg';
import LoginMailBg from 'shared/assets/images/LoginMainBg.svg';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { registrationReducer } from '../../model/slice/registrationSlice';
import styles from './RegistrationForm.module.scss';
import { LoginBlockComponent } from './LoginBlockComponent/LoginBlockComponent';
import { PasswordBlockComponent } from './PasswordBlockComponent/PasswordBlockComponent';
import { PersonalInfoBlockComponent } from './PersonalInfoBlockComponent/PersonalInfoBlockComponent';
import {
    getRegistrationIsEmailValid,
    getRegistrationIsPasswordValid,
    getRegistrationIsPersonalInfoValid,
} from '../../model/selectors/getRegistration/getRegistration';

interface RegistrationFormProps {
  className?: string;
}

const initialReducers: ReducerList = {
    registrationForm: registrationReducer,
};

export const RegistrationForm = memo(({ className }: RegistrationFormProps) => {
    const { t } = useTranslation();

    const [activeStep, setActiveStep] = useState(0);

    const [slideIn, setSlideIn] = useState(true);

    const IsPasswordValid = useSelector(getRegistrationIsPasswordValid);
    const IsEmailValid = useSelector(getRegistrationIsEmailValid);
    const IsPersonalInfoValid = useSelector(getRegistrationIsPersonalInfoValid);

    const handleArrowClick = (direction: 'next' | 'prev') => {
        const newIndex = direction === 'next' ? activeStep + 1 : activeStep - 1;

        setSlideIn(false);

        setTimeout(() => {
            setActiveStep(newIndex);
            setSlideIn(true);
        }, 300);
    };

    const disabledNextButton = useCallback(
        (activeStep: number) => {
            switch (activeStep) {
            case 0:
                if (IsEmailValid) {
                    return false;
                }
                return true;
            case 1:
                if (IsPasswordValid) {
                    return false;
                }
                return true;
            case 2:
                if (IsPersonalInfoValid) {
                    return false;
                }
                return true;

            default:
                return true;
            }
        },
        [IsEmailValid, IsPasswordValid, IsPersonalInfoValid],
    );

    const renderBlock = useCallback(
        (activeStep: number) => {
            switch (activeStep) {
            case 0:
                return <LoginBlockComponent />;
            case 1:
                return <PasswordBlockComponent />;
            case 2:
                return <PersonalInfoBlockComponent />;
            default:
                return null;
            }
        },
        [],
    );

    const renderImage = useCallback(
        (activeStep: number) => {
            switch (activeStep) {
            case 0:
                return <LoginMailBg className={styles.bgImage} />;
            case 1:
                return <PasswordBg className={styles.bgImage} />;
            case 2:
                return <PersonalInfoBg className={styles.bgImage} />;
            default:
                return null;
            }
        },
        [],
    );

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>

            <HStack justify="between" className={classNames('', {}, [className])}>
                <CSSTransition
                    in={slideIn}
                    timeout={300}
                    unmountOnExit
                    classNames="slide-animation"
                >
                    {renderImage(activeStep)}
                </CSSTransition>
                <VStack justify="between" gap="32" className={styles.RegistrationForm}>
                    <Stepper currentStep={activeStep} />

                    <CSSTransition
                        in={slideIn}
                        timeout={300}
                        unmountOnExit
                        classNames="slide-animation"
                    >
                        {renderBlock(activeStep)}
                    </CSSTransition>

                    <HStack max justify={activeStep === 0 ? 'end' : 'between'}>
                        {
                            activeStep !== 0 && (
                                <Button
                                    disabled={activeStep === 0}
                                    theme={ThemeButton.OUTLINE}
                                    onClick={() => handleArrowClick('prev')}
                                >
                                    {t('Назад')}
                                </Button>
                            )
                        }

                        {
                            activeStep !== 2 && (
                                <Button
                                    disabled={false}
                                    theme={ThemeButton.DEFAULT}
                                    onClick={() => handleArrowClick('next')}
                                >
                                    {t('Далее')}
                                </Button>
                            )
                        }

                        {
                            activeStep === 2 && (
                                <Button theme={ThemeButton.DEFAULT}>
                                    {t('Зарегестрироваться')}
                                </Button>
                            )
                        }

                    </HStack>
                </VStack>

            </HStack>
        </DynamicModuleLoader>
    );
});
