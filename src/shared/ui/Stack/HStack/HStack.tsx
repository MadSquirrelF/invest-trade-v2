/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>

export const HStack = (props: HStackProps) => {
    const { t } = useTranslation();
    return (
        <Flex direction="row" {...props} />
    );
};
