/* eslint-disable max-len */
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
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { validatePassword } from '../../model/services/validatePassword/validatePassword';
import { registrationActions, registrationReducer } from '../../model/slice/registrationSlice';
import styles from './RegistrationForm.module.scss';
import { LoginBlockComponent } from './LoginBlockComponent/LoginBlockComponent';
import { PasswordBlockComponent } from './PasswordBlockComponent/PasswordBlockComponent';
import { PersonalInfoBlockComponent } from './PersonalInfoBlockComponent/PersonalInfoBlockComponent';
import {
    getRegistrationPassword,
    getRegistrationPasswordValidateErrors,
    getRegistrationRepeatPassword,
} from '../../model/selectors/getRegistration/getRegistration';

interface RegistrationFormProps {
  className?: string;
}

const initialReducers: ReducerList = {
    registrationForm: registrationReducer,
};

export const RegistrationForm = memo(({ className }: RegistrationFormProps) => {
    const { t } = useTranslation('registration');

    const [activeStep, setActiveStep] = useState(1);

    const [slideIn, setSlideIn] = useState(true);

    const dispatch = useAppDispatch();

    const password = useSelector(getRegistrationPassword);
    const repeatPassword = useSelector(getRegistrationRepeatPassword);
    const validatePasswordErrors = useSelector(getRegistrationPasswordValidateErrors);

    const handleArrowClickBack = () => {
        setSlideIn(false);

        setTimeout(() => {
            setActiveStep(activeStep - 1);
            setSlideIn(true);
        }, 300);
    };

    const handleArrowClickPassword = () => {
        const errors = validatePassword(password, repeatPassword);

        if (errors.length === 0) {
            setSlideIn(false);

            setTimeout(() => {
                setActiveStep(activeStep + 1);
                setSlideIn(true);
            }, 300);
        }

        return dispatch(registrationActions.setPasswordValidErrors(errors));
    };

    const onChangePassword = useCallback((value: string) => {
        dispatch(registrationActions.setPassword((value.trim())));
    }, [dispatch]);

    const onChangeRepeatPassword = useCallback((value: string) => {
        dispatch(registrationActions.setRepeatPassword((value.trim())));
    }, [dispatch]);

    const renderBlock = useCallback(
        (activeStep: number) => {
            switch (activeStep) {
            case 0:
                return <LoginBlockComponent />;
            case 1:
                return (
                    <PasswordBlockComponent
                        onChangePassword={onChangePassword}
                        onChangeRepeatPassword={onChangeRepeatPassword}
                        passwordErrors={validatePasswordErrors}
                    />
                );
            case 2:
                return <PersonalInfoBlockComponent />;
            default:
                return null;
            }
        },
        [onChangePassword, onChangeRepeatPassword, validatePasswordErrors],
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
                                    onClick={() => handleArrowClickBack()}
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
                                    onClick={() => handleArrowClickPassword()}
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
