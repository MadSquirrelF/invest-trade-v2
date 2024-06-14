/* eslint-disable i18next/no-literal-string */
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { HStack, VStack } from '@/shared/ui/Stack';
import { addCommentFormActions, addCommentFormReducer } from '../../model/slice/addCommentFormSlice';

import {
    getAddCommentFormError,
    getAddCommentFormText,
} from '../../model/selectors/AddCommentFormSelectors';
import styles from './AddCommentForm.module.scss';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { covertImageUrl } from '@/shared/lib/covertImageUrl/covertImageUrl';
import { getUserAuthData } from '@/entities/User';

export interface AddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const reducers: ReducerList = {
    addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo(({ className, onSendComment }: AddCommentFormProps) => {
    const { t } = useTranslation();

    const authData = useSelector(getUserAuthData);

    const dispatch = useAppDispatch();

    const text = useSelector(getAddCommentFormText);
    const error = useSelector(getAddCommentFormError);

    const onCommentTextChange = useCallback((value: string) => {
        dispatch(addCommentFormActions.setText(value));
    }, [dispatch]);

    const onSendHandler = useCallback(() => {
        onSendComment(text || '');
        onCommentTextChange('');
    }, [onCommentTextChange, onSendComment, text]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <HStack
                max
                align="start"
                gap="16"
                className={classNames(styles.AddCommentForm, {}, [className])}
            >

                <Avatar size={50} className={styles.avatar} src={covertImageUrl(authData?.avatar)} />

                <VStack max gap="16" align="start">
                    <Input
                        placeholder={t('Введите текст комментария')}
                        label=""
                        value={text}
                        onChange={onCommentTextChange}
                        className={styles.input}
                    />
                    <Button
                        theme={ThemeButton.DEFAULT}
                        onClick={onSendHandler}
                    >
                        {t('Отправить')}

                    </Button>
                </VStack>

            </HStack>
        </DynamicModuleLoader>

    );
});

export default AddCommentForm;
