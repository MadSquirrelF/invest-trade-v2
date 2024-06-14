/* eslint-disable react/no-array-index-key */
/* eslint-disable i18next/no-literal-string */
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './Accordion.module.scss';
import { VStack } from '../Stack';
import { AccordionItem } from './AccordionItem/AccordionItem';
import { SkeletonAccordionItem } from './AccordionItem/SkeletonAccordionItem';
import { Info } from '@/entities/Info';

interface AccordionProps {
  className?: string;
  isLoading: boolean;
  questions: Info[]
}

const getSkeletons = () => new Array(6)
    .fill(0)
    .map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <SkeletonAccordionItem key={index} />
    ));

export const Accordion = memo((props: AccordionProps) => {
    const { t } = useTranslation();

    const { className, isLoading, questions } = props;
    const [activeId, setActiveId] = useState<string>('');

    const renderedQuestionsAnswers = questions.map((item) => (
        <AccordionItem
            item={item}
            key={item._id}
            showAnswer={item._id === activeId}
            handleIndex={() => {
                setActiveId(item._id);
            }}
        />
    ));

    return (
        <VStack max gap="10" className={classNames(styles.Accordion, {}, [className])}>
            {isLoading ? getSkeletons() : renderedQuestionsAnswers}
        </VStack>
    );
});
