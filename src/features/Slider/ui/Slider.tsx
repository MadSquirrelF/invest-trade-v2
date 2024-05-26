/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './Slider.module.scss';
import { Slide, SlideSchema, SlideArrow } from '@/entities/Slide';
import { useSlider } from './useSlider';

interface SliderProps {
  className?: string;
  slides: SlideSchema[];
}

export const Slider = memo(({ className, slides }: SliderProps) => {
    const { t } = useTranslation();

    const {
        slideIn, index, isNext, isPrev, handleArrowClick,
    } = useSlider(slides.length);

    return (
        <div className={classNames(styles.Slider, {}, [className])}>
            <CSSTransition
                in={slideIn}
                classNames="slide-animation"
                timeout={300}
                unmountOnExit
            >
                <Slide
                    slide={slides[index]}
                />
            </CSSTransition>

            {isPrev && (
                <SlideArrow
                    variant="left"
                    clickHandler={() => handleArrowClick('prev')}
                />
            )}
            {isNext && (
                <SlideArrow
                    variant="right"
                    clickHandler={() => handleArrowClick('next')}
                />
            )}
        </div>
    );
});
