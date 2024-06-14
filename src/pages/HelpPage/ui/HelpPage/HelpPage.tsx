/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable i18next/no-literal-string */
/* eslint-disable max-len */
import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Page } from '@/widgets/Page';
import {
    Text, TextAlign, TextBold, TextSize,
} from '@/shared/ui/Text/Text';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs/Breadcrumbs';
import HelloIcon from '@/shared/assets/icons/hello-icon.svg';
import { getUserAuthData } from '@/entities/User';
import { HStack, VStack } from '@/shared/ui/Stack';
import styles from './HelpPage.module.scss';
import { Accordion } from '@/shared/ui/Accordion/Accordion';
import FaqBgDark from '@/shared/assets/images/dark faq.svg';
import FaqBgLight from '@/shared/assets/images/FAQ_BG_ICON.svg';
import { Theme, useTheme } from '@/app/providers/ThemeProvider';
import { HelpPageFilters } from '../HelpPageFilters/HelpPageFilters';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getHelp, helpPageReducer } from '../../model/slice/helpPageSlice';
import { CategoryInfoType } from '@/entities/Info';
import { categoryInfoData } from '../../libs/data/categoryInfoData';
import { getHelpPageCategory, getHelpPageError, getHelpPageIsLoading } from '../../model/selectors/helpPageSelectors';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { initHelpPage } from '../../model/services/initHelpPage/initHelpPage';
import { Error } from '@/shared/ui/Error/Error';

const reducers: ReducerList = {
    helpPage: helpPageReducer,
};

const HelpPage = () => {
    const { t } = useTranslation('help');

    const { theme } = useTheme();

    const dispatch = useAppDispatch();

    const category = useSelector(getHelpPageCategory);

    const authData = useSelector(getUserAuthData);

    const questions = useSelector(getHelp.selectAll);

    const isLoading = useSelector(getHelpPageIsLoading);

    const error = useSelector(getHelpPageError);

    const [searchParams] = useSearchParams();

    useInitialEffect(() => {
        dispatch(initHelpPage(searchParams));
    });

    const renderImage = useCallback(
        (theme: Theme) => {
            switch (theme) {
            case Theme.DARK:
                return <FaqBgDark className={styles.bgIcon} />;
            case Theme.LIGHT:
                return <FaqBgLight className={styles.bgIcon} />;
            }
        },
        [],
    );

    const renderText = useCallback(
        (category: CategoryInfoType) => {
            switch (category) {
            case CategoryInfoType.GENERAL:

                return (
                    <VStack gap="32">
                        <Text
                            gap="0"
                            className={styles.title}
                            align={TextAlign.CENTER}
                            size={TextSize.XXL}
                            bold={TextBold.BOLD}
                            title={categoryInfoData[0].title}
                        />
                        <Text
                            gap="0"
                            align={TextAlign.CENTER}
                            size={TextSize.XXL}
                            bold={TextBold.BOLD}
                            className={styles.text}
                            text={categoryInfoData[0].text}
                        />
                    </VStack>
                );
            case CategoryInfoType.PARTNER:

                return (
                    <VStack gap="32">
                        <Text
                            gap="0"
                            className={styles.title}
                            align={TextAlign.CENTER}
                            size={TextSize.XXL}
                            bold={TextBold.BOLD}
                            title={categoryInfoData[1].title}
                        />
                        <Text
                            gap="0"
                            align={TextAlign.CENTER}
                            size={TextSize.XXL}
                            bold={TextBold.BOLD}
                            className={styles.text}
                            text={categoryInfoData[1].text}
                        />
                    </VStack>
                );
            case CategoryInfoType.APP:

                return (
                    <VStack gap="32">
                        <Text
                            gap="0"
                            className={styles.title}
                            align={TextAlign.CENTER}
                            size={TextSize.XXL}
                            bold={TextBold.BOLD}
                            title={categoryInfoData[2].title}
                        />
                        <Text
                            gap="0"
                            align={TextAlign.CENTER}
                            size={TextSize.XXL}
                            bold={TextBold.BOLD}
                            className={styles.text}
                            text={categoryInfoData[2].text}
                        />
                    </VStack>
                );
            case CategoryInfoType.PRICE:

                return (
                    <VStack gap="32">
                        <Text
                            gap="0"
                            className={styles.title}
                            align={TextAlign.CENTER}
                            size={TextSize.XXL}
                            bold={TextBold.BOLD}
                            title={categoryInfoData[3].title}
                        />
                        <Text
                            gap="0"
                            align={TextAlign.CENTER}
                            size={TextSize.XXL}
                            bold={TextBold.BOLD}
                            className={styles.text}
                            text={categoryInfoData[3].text}
                        />
                    </VStack>
                );
            }
        },
        [],
    );

    if (error) {
        return <Error error="Ошибка загрузки вопросов" />;
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page>
                <Breadcrumbs />

                <VStack max gap="32">

                    <HStack max gap="32" justify="center" className={styles.title}>
                        <HelloIcon className={styles.hello} />

                        <Text
                            gap="0"
                            size={TextSize.XXL}
                            bold={TextBold.BOLD}
                            title={`Здравствуйте, ${authData?.username !== undefined ? authData?.username : 'пользователь'}! Мы здесь, чтобы помочь вам!`}
                        />

                    </HStack>

                    <HelpPageFilters />

                    {renderText(category)}

                    <HStack max justify="between" align="center" gap="50" className="block">

                        {renderImage(theme)}

                        <Accordion questions={questions} isLoading={isLoading} />

                    </HStack>

                </VStack>

            </Page>
        </DynamicModuleLoader>

    );
};

export default HelpPage;
